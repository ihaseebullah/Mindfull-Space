const mongoose = require("mongoose");

const soundscapesSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, trim: true },
    author: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now, index: true },
    thumbnailLink: { type: String, trim: true },
    mediaLink: { type: String, required: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
});
soundscapesSchema.index({ author: 1, title: 1 });
soundscapesSchema.index({ title: 'text', description: 'text' });

const SoundScape = mongoose.model("SoundScape", soundscapesSchema);

module.exports = { SoundScape };
