const express = require("express");
const { Groq } = require("groq-sdk");

const app = express();
app.use(express.json());

// Initialisation de Groq avec la clé API
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get("/", (req, res) => {
    res.json({ status: "online", message: "API Groq Aether opérationnelle !" });
});

app.post("/generate", async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        
        if (!userPrompt) {
            return res.status(400).json({ error: "Le champ 'prompt' est requis." });
        }

        // Appel à l'API Groq avec la personnalité d'Aether
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Tu es Aether, une intelligence artificielle surpuissante, stylée, drôle et pro, créée par Shade. Tu réponds toujours de manière fluide, cool et percutante. Si on te demande qui t'a créé, tu réponds fièrement que c'est Shade."
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const text = chatCompletion.choices[0]?.message?.content || "…";

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
