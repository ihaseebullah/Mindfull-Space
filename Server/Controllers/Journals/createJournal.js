const { Journal } = require("../../Models/Journal");

const createJournal = async (req, res) => {
    try {
        const { title, content, author, mood } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "Title, content, and author are required." });
        }
        const newJournal = new Journal({
            title,
            content,
            author,
            mood
        });
        const savedJournal = await newJournal.save();
        return res.status(201).json(savedJournal);
    } catch (error) {
        console.error("Error creating journal:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const getJournal = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const journal = await Journal.findById(id);
            if (!journal) {
                return res.status(404).json({ message: "Journal not found." });
            }
            return res.status(200).json(journal);
        } else {
            const journals = await Journal.find();
            return res.status(200).json(journals);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    createJournal, getJournal
};
