import { GoogleGenAI } from "@google/genai";
import { ThemeConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SOURCE_IMAGES = [
  "https://i.ibb.co/dstnXYsg/IMG-8537.jpg", // Portrait
  "https://i.ibb.co/whVp9Th4/IMG-8539.jpg"  // Dog/Grass
];

// Helper to get image data
const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        // remove prefix "data:image/jpeg;base64,"
        resolve(base64Url.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Image fetch failed", e);
    return null;
  }
};

export const remixVisuals = async (
  onUpdate: (theme: ThemeConfig) => void
): Promise<void> => {

  // 1. Pick a random source image
  const randomImage = SOURCE_IMAGES[Math.floor(Math.random() * SOURCE_IMAGES.length)];
  const imageBase64 = await fetchImageAsBase64(randomImage);

  // 2. Prepare content parts
  const promptText = `
    You are an avant-garde UI designer.
    Analyze the image to create a ThemeConfig that is DRASTICALLY different from a standard website.
    
    GOAL: "Sterke, deilige farger" (Strong, delicious colors).
    
    Choose a specific design archetype and COMMIT to it fully:
    1. "DEEP ACADEMIA": Dark browns, forest greens, gold text, serif fonts.
    2. "VIBRANT POP": Hot pinks, electric blues, bright yellow accents, sans-serif.
    3. "NORDIC SUNSET": Deep purples, fiery oranges, warm stone, stark contrasts.
    4. "RETRO PIXEL": Cream background, bright red/green/blue primaries, mono font.
    
    CRITICAL RULES:
    - Backgrounds must have COLOR. Do not return plain white.
    - Contrast must be high.
    - If background is dark (e.g., bg-slate-900), textMain must be light (e.g., text-slate-50).
    - If background is light (e.g., bg-amber-100), textMain must be dark.
    
    JSON Schema:
    {
      "background": string (e.g. bg-slate-900, bg-[#2e1065], bg-orange-50),
      "textMain": string (e.g. text-white, text-stone-900),
      "textSecondary": string (e.g. text-slate-400, text-stone-600),
      "primary": string (e.g. text-pink-500, text-orange-600),
      "primaryBg": string (e.g. bg-pink-500, bg-orange-100),
      "border": string,
      "accentBorder": string,
      "gradientFrom": string,
      "gradientTo": string,
      "buttonBg": string,
      "buttonText": string,
      "font": string ('font-sans' | 'font-serif' | 'font-mono')
    }
  `;

  let contents: any = promptText;

  if (imageBase64) {
    contents = {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
        { text: promptText }
      ]
    };
  } else {
    // Fallback description
    contents = `Create a bold, high-contrast theme. ${promptText}`;
  }

  // 3. Call Gemini
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview', 
    contents: contents,
    config: {
      responseMimeType: "application/json"
    }
  });

  // 4. Parse and update
  const text = response.text;
  if (text) {
    try {
      const theme = JSON.parse(text);
      onUpdate(theme);
    } catch (e) {
      console.error("Failed to parse theme JSON", e);
    }
  }
};