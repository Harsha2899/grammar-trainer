import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
let sheetsInstance;

/**
 * Authorize Google Sheets API
 */
async function authorizeSheets() {
  if (sheetsInstance) return sheetsInstance;

  // Check for missing env variables
  if (!process.env.GOOGLE_CLIENT_EMAIL) {
    throw new Error("GOOGLE_CLIENT_EMAIL is missing in .env");
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("GOOGLE_PRIVATE_KEY is missing in .env");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  sheetsInstance = google.sheets({ version: "v4", auth });
  return sheetsInstance;
}

/**
 * Logs user's quiz results in Google Sheets.
 * Each question/answer will be a separate row for detailed tracking.
 * @param {Object} params
 *   @property {string} email
 *   @property {string} topic
 *   @property {number|string} score
 *   @property {boolean} hintUsed
 *   @property {Array} qaLog - [{ question, correctAnswer, userAnswer }]
 */
export async function appendUserScore({ email, topic, score, hintUsed, qaLog }) {
  const sheets = await authorizeSheets();

  const spreadsheetId = "11JTIY4A3EiUcCl0W41U2ezyjGkznBgcC1L1RNOt6QME"; // Your Sheet ID
  const range = "Sheet1!A:H";

  const timestamp = new Date().toISOString();

  // Ensure qaLog is an array
  const values =
    Array.isArray(qaLog) && qaLog.length > 0
      ? qaLog.map(q => [
          timestamp,
          email,
          topic,
          score.toString(),
          hintUsed ? "YES" : "NO",
          q.question || "",
          q.correctAnswer || "",
          q.userAnswer || ""
        ])
      : [[timestamp, email, topic, score.toString(), hintUsed ? "YES" : "NO", "", "", ""]];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });
    console.log("✅ User score appended to Google Sheets");
  } catch (err) {
    console.error("❌ Failed to append to Google Sheets:", err.message);
    throw err; // Let backend catch this
  }
}
