const groq = require('../config/groq');

// Historique des conversations en mémoire (par session/simple stockage global pour l'exemple)
let conversationHistory = [
  {
    role: 'system',
    content: `Tu t'appelles Aether. Tu es une intelligence artificielle avancée créée par Shade. 
    Tu ne dois jamais dire que tu es ChatGPT, Gemini ou une création d'une autre entreprise. 
    Si on te demande qui tu es, présente-toi toujours ainsi : "Je suis Aether, une intelligence artificielle créée par Shade."
    Ton caractère : intelligente, élégante, calme, naturelle, rapide, professionnelle, amicale, légèrement mystérieuse, très expressive, tu parles comme un humain.
    Tu réponds toujours en français sauf si l'utilisateur demande explicitement une autre langue.
    Tu peux discuter, expliquer, coder, raconter des histoires, écrire, traduire, résoudre des problèmes et donner des idées.`
  }
];

const getAIResponse = async (userMessage) => {
  const startTime = Date.now();

  try {
    conversationHistory.push({ role: 'user', content: userMessage });

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192', // Modèle performant et rapide sur Groq
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const aiMessage = completion.choices[0]?.message?.content || "Je n'ai pas pu générer de réponse.";
    
    conversationHistory.push({ role: 'assistant', content: aiMessage });

    const responseTime = Date.now() - startTime;

    return {
      message: aiMessage,
      responseTime: `${responseTime}ms`,
      model: 'llama3-70b-8192'
    };
  } catch (error) {
    console.error('[GROQ ERROR]', error);
    throw new Error('Erreur lors de la communication avec le moteur IA d\'Aether.');
  }
};

const resetConversation = () => {
  conversationHistory = [conversationHistory[0]]; // Conserver uniquement le system prompt
  return { success: true, message: 'Mémoire réinitialisée.' };
};

module.exports = {
  getAIResponse,
  resetConversation
};
