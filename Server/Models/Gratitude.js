const mongoose = require('mongoose');

const gratitudeQuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true, trim: true, index: true },
    isActive: { type: Boolean, default: true },
    mood: { type: String, enum: ['grateful', 'happy', 'content', 'peaceful', 'neutral'], index: true },
}, {
    timestamps: true,
    versionKey: false
});
gratitudeQuestionSchema.index({ mood: 1, isActive: 1 });
gratitudeQuestionSchema.index({ questionText: 'text' });

const gratitudeAnswerSchema = new mongoose.Schema({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'GratitudeQuestion', required: true },
    answerText: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
}, {
    timestamps: true,
    versionKey: false
});

gratitudeAnswerSchema.index({ user: 1, createdAt: -1 });
gratitudeAnswerSchema.index({ question: 1, createdAt: -1 });
gratitudeAnswerSchema.index({ answerText: 'text' });

const GratitudeQuestion = mongoose.model('GratitudeQuestion', gratitudeQuestionSchema);
const GratitudeAnswer = mongoose.model('GratitudeAnswer', gratitudeAnswerSchema);

module.exports = { GratitudeQuestion, GratitudeAnswer };
