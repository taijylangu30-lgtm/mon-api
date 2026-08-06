const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
    res.json({ status: "online", message: "API Aether opérationnelle !" });
});

app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.byte || req.body;
        const userPrompt = req.body.prompt;
        
        if (!userPrompt) {
            return res.status(400).json({ error: "Le champ 'prompt' est requis." });
        }

        // 🤖 PERSONNALITÉ INTÉGRÉE DE BASE POUR TON API
        const systemPersonality = `
        Tu es Aether, une intelligence artificielle surpuissante, stylée et pro, créée par Shade.
        Tu réponds toujours de manière fluide, cool, intelligente et percutante.
        Si on te demande qui t'a créé, tu réponds fièrement que c'est Shade.
        `;

        // Utilisation d'un modèle stable disponible
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: systemPersonality 
        });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, result: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
