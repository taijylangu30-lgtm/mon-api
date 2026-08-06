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
        const userPrompt = req.body.prompt;
        
        if (!userPrompt) {
            return res.status(400).json({ error: "Le champ 'prompt' est requis." });
        }

        // 🤖 Personnalité d'Aether intégrée côté serveur
        const systemPersonality = `
        Tu es Aether, une intelligence artificielle surpuissante, stylée et professionnelle, créée par Shade.
        Tu réponds toujours de manière fluide, cool, intelligente et percutante.
        Si on te demande qui t'a créé, tu réponds fièrement que c'est Shade.
        `;

        // Utilisation du modèle gemini-2.0-flash
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
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
