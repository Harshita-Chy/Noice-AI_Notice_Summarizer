const { GoogleGenerativeAI } =
require("@google/generative-ai");

require("dotenv").config();

const genAI =
new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function summarizeNotice(
  noticeText
) {

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

  const prompt = `
Analyze this NSUT notice.

Return ONLY JSON:

{
  "summary":"",
  "category":"",
  "priority":"",
  "importantDates":[],
  "actionItems":[]
}

Notice:
${noticeText}
`;

  const result =
    await model.generateContent(
      prompt
    );

  return result.response.text();
}

module.exports =
  summarizeNotice;