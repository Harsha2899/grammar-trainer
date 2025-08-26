import { google } from "googleapis";
import path from "path";

// If running on Node.js 18+ with "type": "module", you might need to adjust __dirname
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = path.join(process.cwd(), "service-account-key.json");

let sheetsInstance;

async function authorizeSheets() {
  if (sheetsInstance) return sheetsInstance;
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
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

  // Update range to include all necessary columns
  const spreadsheetId = "11JTIY4A3EiUcCl0W41U2ezyjGkznBgcC1L1RNOt6QME"; // Your Sheet ID
  const range = "Sheet1!A:H";

  // If qaLog is missing or empty, still log at least a single row
  const timestamp = new Date().toISOString();
  const values =
    Array.isArray(qaLog) && qaLog.length > 0
      ? qaLog.map((q) => [
          timestamp,
          email,
          topic,
          score.toString(),
          hintUsed ? "YES" : "NO",
          q.question || "",
          q.correctAnswer || "",
          q.userAnswer || "",
        ])
      : [[timestamp, email, topic, score.toString(), hintUsed ? "YES" : "NO", "", "", ""]];

  const resource = { values };
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource,
  });
}
