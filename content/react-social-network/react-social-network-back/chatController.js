const Chat = require('./models/Chat.js')
const Message = require('./models/Message.js')

class chatController {
    async createChat(req, res) {
        try {
            const data = req.body
            const chat = new Chat(data)
            await chat.save()
            return res.status(200).json({ message: 'chat created', chat })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'chat create failed' })
        }
    }

    async getAllChats(req, res) {
        try {
            const chats = await Chat.find()
            return res.status(200).json({ chats })
        } catch (err) {
            console.log(err)
        }
    } 
 
    async getMyChats(req, res) {
        try { 
            const {userId} = req.body
            const chats = await Chat.find().or([{creatorId: userId}, {participantId: userId}])
            return res.status(200).json ({ chats }) 
        } catch (err) {
            console.log(err)
        }
    } 

    async sendMessage(req, res) {
        try {
            const data = req.body
            const message = new Message(data)
            await message.save()
            return res.status(200).json({ message: 'message sent', message })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'message create failed' })
        } 
    } 

    async getMessages(req, res) {
        try { 
            const {chatId} = req.body
            const messages = await Message.find({chatId: chatId})
            return res.status(200).json ({ messages }) 
        } catch (err) {
            console.log(err)
        }
    } 

}

module.exports = new chatController()