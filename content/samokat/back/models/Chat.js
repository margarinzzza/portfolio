const { Schema, model } = require('mongoose')

const Chat = new Schema({
    type: {
        type: String,
        required: true
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' }, chatId: {type: Schema.Types.ObjectId, ref: 'Chat'}, text: String,
        status: String, whoRead: [{type: Schema.Types.ObjectId, ref: 'User'}], deleteFor: [{type: Schema.Types.ObjectId, ref: 'User'}],
        createdAt: String, updatedAt: String, isModified: { type: Boolean, default: false }
    }],
    deleteFor: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true })

module.exports = model('Chat', Chat)