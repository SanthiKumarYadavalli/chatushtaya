import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
]

const API_KEY = "AIzaSyARK_lneNnX5svCRRpjqG9pHD3YmRvP90s";
const genAI = new GoogleGenerativeAI(API_KEY);

export const getResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: safetySettings });
  const result = await model.generateContent(prompt);
  return result.response.text();
}