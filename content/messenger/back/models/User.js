const { Schema, model } = require('mongoose')

const User = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true
    },
    surname: {
        type: String, 
        required: true
    },
    link: {
        type: String, 
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String, 
        default: ''
    },
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    chats: [{type: Schema.Types.ObjectId, ref: 'Chat'}],
    friendOffers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    myFriendOffers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    password: {
        type: String, 
        required: true
    },

}, {timestamps: true})

module.exports = model('User', User)