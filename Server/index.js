const express = require('express')
const { default: mongoose } = require('mongoose')
const { MeditationRouter } = require('./Routes/Meditation')
const dotenv = require('dotenv').config()
const cookies = require('cookie-parser')
const cors = require('cors')
const { SoundsScapeRouter } = require('./Routes/SoundScapes')
const amINew = require('./Middlewares/amINew')
const { JournalRouter } = require('./Routes/Journal')
const { GratitudeRouter } = require('./Routes/Gartitude')
const { AffirmationGenrator } = require('./Controllers/Affirmation/GenrateAffirmation')
const ChatbotRouter = require('./Routes/Chatbot')
const app = express()
app.use(cookies())
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']  // allow headers for Authorization
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(amINew)

app.use('/api/v1/mindfullspace', MeditationRouter)
app.use('/api/v1/mindfullspace', SoundsScapeRouter)
app.use('/api/v1/mindfullspace', JournalRouter)
app.use('/api/v1/mindfullspace', GratitudeRouter)
app.post('/api/v1/mindfullspace/genrate/affirmations', AffirmationGenrator)
app.use('/api/v1/mindfullspace',ChatbotRouter)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✔️`)
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Mindfull Space connected to MongoDB ✔️')
    })
})