const { Groq } = require('groq-sdk');

// Vérification de sécurité pour la clé API
if (!process.env.GROQ_API_KEY) {
  console.error('[ERREUR] La variable d\'environnement GROQ_API_KEY est manquante.');
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

module.exports = groq;
