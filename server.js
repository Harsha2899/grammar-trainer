import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { appendUserScore } from "./googleSheets.js";

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GEMINI_API_KEY;

// ========= STATIC FRONTEND SETUP =========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html, script.js, etc. from project root
app.use(express.static(__dirname));

// =========================================

// Function to generate quiz questions using Gemini
async function askGemini(topic, isSATLevel, wrongTopics = [], introContent = "") {
  const questionCount = 10;

  const contentNote = `Use ONLY the following content from the intro page as reference:\n${introContent}\n`;

  let prompt;
  if (isSATLevel) {
    prompt = `
${contentNote}
The user has mastered the basic concepts. Generate a JSON array of ${questionCount} challenging SAT-level reading comprehension questions based STRICTLY on the above content. 
Questions must simulate real SAT difficulty and style, requiring deeper reasoning or inference related to the intro concepts. 
NO question repeats allowed.

Each question must follow this JSON structure:
{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "answer": "B",
  "hint": "string",
  "topic": "string",
  "rationale": "string",
  "feedback": "string",
  "followUp": {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "C"
  }
}

Return ONLY the JSON array with no additional text.
`;
  } else if (wrongTopics.length > 0) {
    prompt = `
${contentNote}
Generate a JSON array of ${questionCount} remedial multiple-choice questions focused ONLY on these topics: ${wrongTopics.join(", ")}. 
Questions must be STRICTLY based on the intro content above. All must be unique.

Format for each question:
{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "answer": "B",
  "hint": "string",
  "topic": "string",
  "rationale": "string",
  "feedback": "string",
  "followUp": {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "C"
  }
}

Return ONLY the JSON array.
`;
  } else {
    prompt = `
${contentNote}
Generate a JSON array of ${questionCount} basic-level multiple-choice questions for "${topic}". 
Do NOT repeat any questions. ALL must be unique.

Format for each question:
{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "answer": "B",
  "hint": "string",
  "topic": "string",
  "rationale": "string",
  "feedback": "string",
  "followUp": {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "C"
  }
}

Return ONLY the JSON array.
`;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let jsonString = "";
    const arrayStart = text.indexOf("[");
    const arrayEnd = text.lastIndexOf("]");
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      jsonString = text.substring(arrayStart, arrayEnd + 1);
    } else {
      jsonString = text.replace(/```(?:json)?/g, "").trim();
      const regexMatch = jsonString.match(/\[[\s\S]*\]/);
      jsonString = regexMatch ? regexMatch[0] : "";
    }

    if (!jsonString) {
      throw new Error("AI response did not contain a valid JSON array.");
    }

    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Error in askGemini function:", err.message);
    throw new Error(`Failed to generate quiz: ${err.message}`);
  }
}

// ===================== API ENDPOINTS =====================
// (your existing endpoints remain unchanged below)

// Example endpoint already in your file
app.post("/ai-study-material", async (req, res) => {
  const { topic } = req.body;

  const prompt = `
You are an SAT English grammar tutor. 
Provide a concise study guide (max 12 sentences) for "${topic}" followed by 5 illustrative example sentences with explanations showing correct usage. 

Format your reply as a JSON object:
{
  "studyGuide": "string",
  "examples": [
    { "sentence": "string", "explanation": "string" },
    { "sentence": "string", "explanation": "string" },
    { "sentence": "string", "explanation": "string" },
    { "sentence": "string", "explanation": "string" },
    { "sentence": "string", "explanation": "string" }
  ]
}

Return ONLY JSON. No extra text.
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const body = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    const aiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await aiRes.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Gemini response.");

    res.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error("Error /ai-study-material:", err.message);
    res.status(500).json({
      error: "Failed to fetch study material",
      details: err.message,
    });
  }
});

// Endpoint to generate quiz questions
app.post("/generate-quiz", async (req, res) => {
  const { topic, isSATLevel, wrongTopics, introContent } = req.body;
  try {
    const questions = await askGemini(topic, isSATLevel, wrongTopics, introContent);
    res.json({ questions });
  } catch (err) {
    console.error("Error /generate-quiz:", err.message);
    res.status(500).json({
      error: "Failed to generate quiz",
      details: err.message,
    });
  }
});
// New endpoint to log user quiz results to Google Sheets
app.post("/log-score", async (req, res) => {
  const { email, topic, score, hintUsed, qaLog } = req.body; // qaLog = array of {question, options, correctAnswer, userAnswer}
  if (!email || !topic || score === undefined || !qaLog) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await appendUserScore({ email, topic, score, hintUsed, qaLog });
    res.status(200).json({ message: "User score logged successfully" });
  } catch (error) {
    console.error("Error logging user score:", error);
    res.status(500).json({ error: "Failed to log user score" });
  }
});

// (other endpoints from your file)

// ===================== START SERVER =====================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} to view the app`);
});
