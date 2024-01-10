const { Schema, model } = require('mongoose')

const Event = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ''
    },
    category: String,
    city: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
        type: String,
        default: 'Active'
    },
    adress: {
        type: String,
        required: true
    },
    startDateAndTime: {
        type: String,
        required: true
    },
    durationTime: {
        type: String,
        required: true
    },
    participantsMinNum: {
        type: Number,
        required: true
    },
    participantsMaxNum: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        default: ''
    },

}, { timestamps: true })

module.exports = model('Event', Event)