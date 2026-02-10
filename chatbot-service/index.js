const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("ඔයාගේ_අලුත්_API_KEY_එක_මෙතනට_දාන්න");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Chatbot එකට AgriLinker ගැන කියලා දෙන තැන
        const prompt = `You are the AgriLinker Assistant. Help farmers and buyers. User says: ${message}`;
        
        const result = await model.generateContent(prompt);
        res.json({ reply: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
});

app.listen(5001, () => console.log("Chatbot service running on port 5001"));