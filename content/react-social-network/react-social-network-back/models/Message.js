const { Schema, model } = require('mongoose')

const Message = new Schema({
    chatId: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timeStamps: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Message', Message)