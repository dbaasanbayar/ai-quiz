import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  const body = await request.json();
  const { contentValue } = await body;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${contentValue}`,
  });

  console.log(response.text);
  return Response.json({ response });
}
