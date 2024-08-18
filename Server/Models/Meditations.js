const mongoose = require('mongoose');

const meditationSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    narrator: { type: String, trim: true },
    author: { type: String, trim: true },
    duration: { type: Number, required: true },
    tags: { type: [String], index: true },
    genre: { type: String, enum: ['grateful', 'happy', 'content', 'peaceful', 'neutral'], index: true },
    thumbnailLink: { type: String, trim: true },
    mediaLink: { type: String, required: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
});

meditationSchema.index({ genre: 1, author: 1 });

meditationSchema.index({ title: 'text', tags: 'text' });

const Meditation = mongoose.model('Meditation', meditationSchema);
module.exports = { Meditation };
