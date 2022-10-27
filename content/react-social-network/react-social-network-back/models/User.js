const { Schema, model } = require('mongoose')

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    dateOfBirth: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = model('User', User)