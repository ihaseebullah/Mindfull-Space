const { Meditation } = require("../../Models/Meditations");

const addMeditation = async (req, res) => {
    try {
        const { title, author, narrator, duration, tags, genre, thumbnailLink, mediaLink } = req.body;
        if (!title || !mediaLink) {
            return res.status(400).json({ message: "Title and Media Link are required." });
        }
        const newMeditation = new Meditation({
            title,
            author,
            narrator,
            duration,
            tags,
            genre,
            thumbnailLink,
            mediaLink
        });
        const savedMeditation = await newMeditation.save();
        res.status(201).json({ message: "Meditation added successfully", data: savedMeditation });
    } catch (err) {
        console.error("Error adding meditation:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { addMeditation };
