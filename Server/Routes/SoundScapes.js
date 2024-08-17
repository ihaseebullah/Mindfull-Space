const { uploadSoundScape, getSoundScapes } = require('../Controllers/Sounds/soundsScapes')

const SoundsScapeRouter = require('express').Router()

SoundsScapeRouter.post('/sound-scape/upload', uploadSoundScape)
SoundsScapeRouter.get('/sound-scape/get', getSoundScapes)


module.exports = { SoundsScapeRouter }