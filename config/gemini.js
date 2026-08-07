const { GoogleGenAI } = require('@google/genai');

if (!process.env.GEMINI_API_KEY) {
  console.error('[ERREUR] La variable d\'environnement GEMINI_API_KEY est manquante.');
  process.exit(1);
}

// Initialisation avec la nouvelle syntaxe Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = ai;
