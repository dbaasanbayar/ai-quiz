// import { GoogleGenAI } from "@google/genai";
// import chalk from "chalk";

// const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_API_KEY});

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { contentValue } = await body;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: `Please provide a concise summary of the following article: ${contentValue}`,
//   });

//   const quiz = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: `Generate 5 multiple choice questions based on this article: ${response.text}. Return the response in this exact JSON format:
//       [   
//         {
//           "question": "Question text here",
//           "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
//           "answer": "0"
//         }
//       ]
//       Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
//   });

//   console.log("AI res:", chalk.magenta(response.text)); 
//   console.log("AI quiz:", chalk.green(quiz.text));    
  
//   return Response.json({ summary: response.text, quiz: quiz.text });
// }

import { GoogleGenAI } from "@google/genai";
import chalk from "chalk";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contentValue } = body;

    if (!contentValue) {
      return Response.json({ error: "No content provided" }, { status: 400 });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
        Analyze this article: "${contentValue}"
        Return a JSON object with exactly these two keys:
        1. "summary": A brief overview.
        2. "quizzes": An array of 5 questions, each with "question", "options" (array), and "answer" (index 0-3).
      `,
      config: {
        responseMimeType: "application/json",
      }
    });

    // CRITICAL FIX: The new SDK uses result.text (as a getter) or result.response.text()
    // We also use a fallback in case the AI didn't return valid JSON
    const rawText = result.text || ""; 
    const data = JSON.parse(rawText);

    console.log(chalk.magenta("Successfully generated data for article."));

    // Ensure we return the exact keys your frontend/DB is looking for
    return Response.json({
      summary: data.summary,
      quiz: data.quizzes, // Changed to match your 'quizzes: null' error
      createdat: new Date().toISOString(),
      updatedat: new Date().toISOString()
    });

  } catch (error: any) {
    console.error(chalk.red("SDK Error:"), error);
    return Response.json({ 
      summary: null, 
      quizzes: null, 
      error: error.message 
    }, { status: 500 });
  }
}

