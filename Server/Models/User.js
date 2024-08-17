const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, index: true, unique: true },
    parentId: String,
    miniAppName: String
})

const User = mongoose.model('User', userSchema)

module.exports = { User }