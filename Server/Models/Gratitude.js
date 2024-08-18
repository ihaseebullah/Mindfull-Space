const mongoose = require('mongoose');

const gratitudeQuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true, trim: true, index: true },
    isActive: { type: Boolean, default: true },
    mood: { type: String, enum: ['grateful', 'happy', 'content', 'peaceful', 'neutral'], index: true },
    questionNumber: Number
}, {
    timestamps: true,
    versionKey: false
});
gratitudeQuestionSchema.index({ mood: 1, isActive: 1 });
gratitudeQuestionSchema.index({ questionText: 'text' });

const gratitudeAnswerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'GratitudeQuestion', required: true },
    answerText: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    questionNumber: Number

}, {
    timestamps: true,
    versionKey: false
});

gratitudeAnswerSchema.index({ userId: 1, createdAt: -1 });
gratitudeAnswerSchema.index({ questionId: 1, createdAt: -1 });
gratitudeAnswerSchema.index({ answerText: 'text' });

const GratitudeQuestion = mongoose.model('GratitudeQuestion', gratitudeQuestionSchema);
const GratitudeAnswer = mongoose.model('GratitudeAnswer', gratitudeAnswerSchema);

module.exports = { GratitudeQuestion, GratitudeAnswer };
