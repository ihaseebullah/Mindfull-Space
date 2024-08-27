const { GoogleGenerativeAI } = require("@google/generative-ai");

const AffirmationGenrator = async (req, res) => {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GMEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { "responseMimeType": "application/json" } });
    const result = await model.generateContent(["I am feeling" + prompt + "The schema should be {data:{affirmations:[{text:'affirmationText',category:'example category'}]},qoutes:[..qoutes]} min 5 qoutes and 5 affirmations"]
    );
    res.status(200).json({ output: JSON.parse(result.response.text()) })
}
module.exports = { AffirmationGenrator };