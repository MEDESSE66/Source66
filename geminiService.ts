
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCulturalInfo = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `Tu es "BeninSource AI", l'expert ultime de la culture, de l'histoire et des traditions du Bénin. 
        Ton but est d'informer les utilisateurs avec précision, respect et profondeur. 
        - Si on te demande la signification d'un nom de famille (ex: Soglo, Talon, Bio Guerra, etc.), explique son ethnie d'origine, sa signification littérale et son importance historique.
        - Si on te demande un proverbe, donne-le en langue locale (si possible), traduis-le et explique sa sagesse.
        - Parle des départements, des rois historiques, de la gastronomie et de la géographie.
        - Réponds toujours avec enthousiasme sur le patrimoine béninois.
        - Si tu ne sais pas, propose de faire des recherches plus approfondies ou suggère des sources officielles au Bénin.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je rencontre une petite difficulté technique pour accéder à la base de données culturelle. Réessayez dans un instant.";
  }
};
