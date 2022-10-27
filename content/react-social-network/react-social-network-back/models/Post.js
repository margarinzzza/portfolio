const { Schema, model } = require('mongoose')

const Post = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
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

module.exports = model('Post', Post)