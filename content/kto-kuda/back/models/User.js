const { Schema, model } = require('mongoose')

const User = new Schema({
    phone: {
        type: Number, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true
    },
    avatarUrl: {
        type: String, 
        default: ''
    },
    age: {
        type: Number, 
        default: 0
    },
    city: {
        type: String, 
        required: true
    },
    interests: [String],
    subscriptions: [{type: Schema.Types.ObjectId, ref: 'User'}],
    subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    events: [{type: Schema.Types.ObjectId, ref: 'Event' }],
    alerts: [{id: Schema.Types.ObjectId, title: String, text: String, timeStamps: String}],
    password: {
        type: String, 
        required: true
    },

}, {timestamps: true})

module.exports = model('User', User)