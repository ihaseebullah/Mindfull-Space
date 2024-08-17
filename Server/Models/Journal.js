const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    content: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mood: { type: String, enum: ['happy', 'sad', 'neutral', 'angry', 'excited'], index: true },
}, {
    timestamps: true,
    versionKey: false
});

journalSchema.index({ author: 1, title: 1 });
journalSchema.index({ title: 'text', content: 'text' });
const Journal = mongoose.model('Journal', journalSchema);

module.exports = { Journal };
