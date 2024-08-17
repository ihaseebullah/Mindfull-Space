const express = require('express')
const { default: mongoose } = require('mongoose')
const { MeditationRouter } = require('./Routes/addMeditation')
const dotenv = require('dotenv').config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/v1/mindfullspace', MeditationRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✔️`)
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Mindfull Space connected to MongoDB ✔️')
    })
})