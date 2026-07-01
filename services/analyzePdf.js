require("dotenv").config();

const fs = require("fs");

const {
  GoogleGenerativeAI
} =
require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function analyzePdf(
  filePath
) {

  const pdfBytes =
    fs.readFileSync(
      filePath
    );

  const model =
    genAI.getGenerativeModel({
      model:
        "gemini-2.5-flash"
    });

  const result =
    await model.generateContent([
      {
        inlineData: {
          data:
            pdfBytes.toString(
              "base64"
            ),
          mimeType:
            "application/pdf"
        }
      },

      `
Analyze this NSUT notice.

Return ONLY valid JSON.

Rules:

category must be one of:
[
  "Academic",
  "Exam",
  "Placement",
  "Hostel",
  "Scholarship",
  "Administrative",
  "Research",
  "Event",
  "General"
]

priority must be one of:
[
  "High",
  "Medium",
  "Low"
]

For importantDates:
Return:
[
  {
    "date":"",
    "description":""
  }
]

For actionItems:
Return a list of actionable tasks.

JSON format:
{
  "summary":"",
  "category":"",
  "priority":"",
  "importantDates":[],
  "actionItems":[]
}

Return ONLY JSON.
`
    ]);

  let text =
    result.response.text();

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}

module.exports =
  analyzePdf;