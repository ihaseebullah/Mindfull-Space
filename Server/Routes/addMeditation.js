const { addMeditation } = require('../Controllers/Meditation/Add')

const MeditationRouter = require('express').Router()

MeditationRouter.post('/meditation/create', addMeditation)


module.exports = { MeditationRouter }