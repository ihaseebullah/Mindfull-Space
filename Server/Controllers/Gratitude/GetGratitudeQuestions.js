const getGratitudeAnswersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID parameter is required." });
        }

        const answers = await GratitudeAnswer.find({ userId }).populate('question');
        return res.status(200).json(answers);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getGratitudeQuestionsByMood = async (req, res) => {
    try {
        const { mood } = req.params;

        if (!mood) {
            return res.status(400).json({ message: "Mood parameter is required." });
        }

        const questions = await GratitudeQuestion.find({ mood });
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getGratitudeAnswersByUserId, getGratitudeQuestionsByMood }