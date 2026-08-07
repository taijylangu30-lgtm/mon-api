require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use('/', chatRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`[AETHER SERVER] En ligne sur le port ${PORT}`);
});
