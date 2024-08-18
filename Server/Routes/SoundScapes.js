const { uploadSoundScape, getSoundScapes, getAllSoundscapes } = require('../Controllers/Sounds/soundsScapes')

const SoundsScapeRouter = require('express').Router()

SoundsScapeRouter.post('/sound-scape/upload', uploadSoundScape)
SoundsScapeRouter.get('/sound-scape/get', getSoundScapes)
SoundsScapeRouter.get('/sound-scape/getAll', getAllSoundscapes)


module.exports = { SoundsScapeRouter }