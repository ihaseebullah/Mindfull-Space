const { createJournal, getJournal } = require('../Controllers/Journals/createJournal')

const JournalRouter = require('express').Router()

JournalRouter.post('/journal/create', createJournal)
JournalRouter.get('/journal/get/:userId', getJournal)

module.exports = { JournalRouter }