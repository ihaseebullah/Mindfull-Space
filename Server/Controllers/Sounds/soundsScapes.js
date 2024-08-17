const { SoundScape } = require("../../Models/Soundscape");

const uploadSoundScape = async (req, res) => {
    try {
        const { title, description, author, thumbnailLink, mediaLink } = req.body;
        if (!title || !mediaLink) {
            return res.status(400).json({ message: "Title and Media Link are required." });
        }
        const newSoundScape = new SoundScape({
            title,
            description,
            author,
            thumbnailLink,
            mediaLink
        });
        const savedSoundScape = await newSoundScape.save();
        return res.status(201).json(savedSoundScape);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
};
const getSoundScapes = async (req, res) => {
    try {
        const { title, author, createdAt } = req.query;
        const query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search
        }
        if (author) {
            query.author = { $regex: author, $options: 'i' }; // Case-insensitive regex search
        }
        if (createdAt) {
            query.createdAt = { $gte: new Date(createdAt) };
        }

        const soundscapes = await SoundScape.find(query);
        if (soundscapes.length === 0) {
            return res.status(404).json({ message: "Nothing matching was found." });
        } else {
            return res.status(200).json(soundscapes);
        }
    } catch (error) {
        console.error("Error getting soundscapes:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    uploadSoundScape, getSoundScapes
};
