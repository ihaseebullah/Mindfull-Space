const { GratitudeQuestion, GratitudeAnswer } = require("../../Models/Gratitude");

const addGratitudeQuestion = async (req, res) => {
    try {
        const { questionText, isActive, mood } = req.body;
        if (!questionText) {
            return res.status(400).json({ message: "Question text is required." });
        }
        const newQuestion = new GratitudeQuestion({
            questionText,
            isActive,
            mood
        });
        const savedQuestion = await newQuestion.save();
        return res.status(201).json(savedQuestion);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const submitGratitudeAnswer = async (req, res) => {
    try {
        const { questionId, answerText, userId } = req.body;

        if (!questionId || !answerText || !userId) {
            return res.status(400).json({ message: "Question, answer text, and user ID are required." });
        }

        const newAnswer = new GratitudeAnswer({
            questionId,
            answerText,
            userId
        });

        const savedAnswer = await newAnswer.save();
        return res.status(201).json(savedAnswer);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    addGratitudeQuestion, submitGratitudeAnswer
};
