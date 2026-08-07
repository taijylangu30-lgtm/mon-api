const { getAIResponse, resetConversation } = require('../services/aiService');

const startTimeServer = Date.now();

exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.getStatus = (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTimeServer) / 1000);
  res.json({
    status: 'Online',
    uptime: `${uptimeSeconds}s`,
    model: 'llama3-70b-8192'
  });
};

exports.postChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.json({
        message: `🤖 Aether AI\n\nJe vois que tu es prêt à discuter, mais tu ne m'encore rien demandé.\nQue souhaites-tu faire aujourd'hui ?\n• discuter\n• générer une idée\n• écrire un texte\n• programmer\n• apprendre quelque chose\n\nJe suis prête à t'aider.`
      });
    }

    const result = await getAIResponse(message);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postReset = (req, res) => {
  const result = resetConversation();
  res.json(result);
};

exports.getInfo = (req, res) => {
  res.json({
    name: 'Aether AI',
    creator: 'Shade',
    version: '1.0.0',
    description: 'Intelligence artificielle avancée'
  });
};
