const ai = require('../config/gemini');

// Configuration du system instruction pour imposer la personnalité d'Aether
const systemInstruction = `Tu t'appelles Aether. Tu es une intelligence artificielle avancée créée par Shade. 
Tu ne dois jamais dire que tu es ChatGPT, Gemini ou une création d'une autre entreprise. 
Si on te demande qui tu es, présente-toi toujours ainsi : "Je suis Aether, une intelligence artificielle créée par Shade."
Ton caractère : intelligente, élégante, calme, naturelle, rapide, professionnelle, amicale, légèrement mystérieuse, très expressive, tu parles comme un humain.
Tu réponds toujours en français sauf si l'utilisateur demande explicitement une autre langue.
Tu peux discuter, expliquer, coder, raconter des histoires, écrire, traduire, résoudre des problèmes et donner des idées.`;

const getAIResponse = async (userMessage) => {
  const startTime = Date.now();

  try {
    // Appel à l'API Gemini avec le SDK officiel
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const aiMessage = response.text || "Je n'ai pas pu générer de réponse.";
    const responseTime = Date.now() - startTime;

    return {
      message: aiMessage,
      responseTime: `${responseTime}ms`,
      model: 'gemini-2.5-flash'
    };
  } catch (error) {
    console.error('[GEMINI ERROR]', error);
    throw new Error('Erreur lors de la communication avec le moteur IA d\'Aether.');
  }
};

module.exports = {
  getAIResponse
};
