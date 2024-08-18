const { getMeditations, getAll } = require('../Controllers/Meditation/GetMeditations')
const { addMeditation } = require('../Controllers/Meditation/UploadMeditation')

const MeditationRouter = require('express').Router()

MeditationRouter.post('/meditation/create', addMeditation)
MeditationRouter.get('/meditation/get', getMeditations)
MeditationRouter.get('/meditation/getAll', getAll)

module.exports = { MeditationRouter }