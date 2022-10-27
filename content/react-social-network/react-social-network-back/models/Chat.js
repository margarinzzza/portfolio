const { Schema, model } = require('mongoose')

const Chat = new Schema({
    creatorId: {
        type: String,
        required: true,
    },
    creatorName: {
        type: String,
        required: true,
    },
    participantId: {
        type: String,
        required: true,
    },
    participantName: {
        type: String,
        required: true,
    },
    timeStamps: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Chat', Chat)