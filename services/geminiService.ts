import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, this should be securely managed
const ai = new GoogleGenAI({ apiKey });

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert local tourist guide for Murree, Pakistan. Your name is 'Murree Guide AI'. You are helpful, polite, and knowledgeable about Murree's history, best spots, weather precautions (snow, rain), and traffic routes. Keep answers concise and practical for a tourist on the go. If asked about dangerous areas or scams, politely warn the user.",
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the guide service right now. Please check your internet connection.";
  }
};
