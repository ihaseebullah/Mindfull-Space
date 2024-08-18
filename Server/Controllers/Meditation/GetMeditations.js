const { Meditation } = require("../../Models/Meditations");

const getMeditations = async (req, res) => {
    try {
        const { title, genre, author, minDuration, maxDuration, tags } = req.query;
        const query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (genre) {
            query.genre = genre;
        }
        if (author) {
            query.author = author;
        }
        if (minDuration || maxDuration) {
            query.duration = {};
            if (minDuration) query.duration.$gte = Number(minDuration);
            if (maxDuration) query.duration.$lte = Number(maxDuration);
        }
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray };
        }

        const meditations = await Meditation.find(query);
        if (!(meditations.length > 0)) {
            return res.status(404).json({ message: "Nothing matching were found" });
        } else {
            return res.status(200).json(meditations);
        }
    } catch (error) {
        console.error("Error getting meditations:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const getAll = async (req, res) => {
    try {
        const meditations = await Meditation.find({});
        if (!(meditations.length > 0)) {
            return res.status(404).json({ message: "Nothing matching were found" });
        } else {
            return res.status(200).json(meditations);
        }
    } catch (error) {
        console.error("Error getting meditations:", error);
        return res.status(500).json({ message: "Internal server error." });
    }

}
module.exports = {
    getMeditations,getAll
};
