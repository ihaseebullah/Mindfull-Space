const ChatbotRouter = require('express').Router()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv').config()
const genAI = new GoogleGenerativeAI('AIzaSyD1--HkIV2HqaR2rwa3TOkScfCmPK6Zt0k');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "You need to pretend to be an AI assistant that help user relax and have a talk being more humbel relaxing and make people feel good about themselves.For this reason Your name is Eleven Ai you could help user to get away from stress and anxiety and thats it." }],
        },
        {
            role: "model",
            parts: [{ text: "Okay, Lets start!" }],
        },
    ],
});

ChatbotRouter.post('/chat', async (req, res) => {
    try {
        let result = await chat.sendMessage(req.body.message);
        res.json(result.response.text());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
})

module.exports = ChatbotRouter;