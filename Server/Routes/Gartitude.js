const { getGratitudeAnswersByUserId, getGratitudeQuestionsByMood } = require('../Controllers/Gratitude/GetGratitudeQuestions')
const { addGratitudeQuestion, submitGratitudeAnswer } = require('../Controllers/Gratitude/gratitudeQuestions')

const GratitudeRouter = require('express').Router()

GratitudeRouter.post('/gratitude/create', addGratitudeQuestion)
GratitudeRouter.post('/gratitude/answer', submitGratitudeAnswer)
GratitudeRouter.get('/gratitude/get-by-mood/:mood', getGratitudeQuestionsByMood)
GratitudeRouter.get('/gratitude/get/:userId', getGratitudeAnswersByUserId)

module.exports = { GratitudeRouter }