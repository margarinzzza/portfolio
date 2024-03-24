const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 5000
const Chat = require('./models/Chat.js')
const User = require('./models/User.js')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/', router)

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })
let onlineUsers = []

io.on('connection', (socket) => {
    io.emit('returnOnlineUsers', onlineUsers)
    socket.on('addUser', ({ userId, socketId }) => {
        const candidate = onlineUsers.find(el => el.userId === userId)
        if (!candidate) onlineUsers.push({ userId, socketId: socket.id })
        io.emit('returnOnlineUsers', onlineUsers)
    })
    socket.on('sendMsg', async ({ to, from, text, chatId, createdAt, updatedAt }) => {
        const sendUserSocket = onlineUsers.find(el => el.userId === to)
        const senderUserSocket = onlineUsers.find(el => el.userId === from)
        let msgObj = { userId: from, text, status: '', createdAt, updatedAt, chatId, whoRead: [from] }
        const chat = await Chat.findById(chatId)
        chat.messages.push(msgObj)
        const updatedChat = await chat.save()
        const newMsgObj = updatedChat.messages[updatedChat.messages.length - 1]
        const userInfo = await User.findById(from)
        const toUserInfo = await User.findById(to)
        const { name, surname, link, avatarUrl } = userInfo
        const { _id: receiverId } = toUserInfo
        if (sendUserSocket) socket.nsp.to(sendUserSocket.socketId).to(senderUserSocket.socketId).emit('msgRecieve', { receiverId, chatId, name, surname, link, avatarUrl, ...newMsgObj._doc })
        if (!sendUserSocket) socket.nsp.to(senderUserSocket.socketId).emit('msgRecieve', { receiverId, chatId, name, surname, link, avatarUrl, ...newMsgObj._doc })
    })
    socket.on('updateMsg', async ({ to, from, chatId, msgId, text, updatedAt }) => {
        const sendUserSocket = onlineUsers.find(el => el.userId === to)
        const senderUserSocket = onlineUsers.find(el => el.userId === from)
        const chat = await Chat.findById(chatId)
        const msgIdx = chat.messages.findIndex(el => el._id.toString() === msgId.toString())
        chat.messages[msgIdx].text = text
        chat.messages[msgIdx].updatedAt = updatedAt
        chat.messages[msgIdx].isModified = true
        chat.markModified('messages')
        await chat.save()
        if (sendUserSocket) socket.nsp.to(sendUserSocket.socketId).to(senderUserSocket.socketId).emit('msgUpdate', { chatId: chat._id, msgData: chat.messages[msgIdx] })
        if (!sendUserSocket) socket.nsp.to(senderUserSocket.socketId).emit('msgUpdate', { chatId: chat._id, msgData: chat.messages[msgIdx] })
    })
    socket.on('deleteMsg', async ({ to, from, chatId, delForAll, selectedMsgs }) => {
        const sendUserSocket = onlineUsers.find(el => el.userId === to)
        const senderUserSocket = onlineUsers.find(el => el.userId === from)
        const chat = await Chat.findById(chatId)
        let finalArr = chat.messages
        for (const msg of selectedMsgs) {
            const idx = chat.messages.findIndex(el => el._id.toString() === msg._id.toString())
            if (delForAll) {
                const filtered = finalArr.filter(el => el._id.toString() !== msg._id.toString())
                finalArr = filtered
            }
            if (!delForAll) chat.messages[idx].deleteFor.push(from)
        }
        chat.messages = finalArr
        chat.markModified('messages')
        let newLastMsg
        for (let i = chat.messages.length - 1; i >= 0; i--) {
            const isDeleteForUser = chat.messages[i].deleteFor.find(el => el.toString() === from.toString())
            if (!isDeleteForUser) {
                const user = await User.findById(chat.messages[i].userId)
                const { _id, name, link } = user
                const { userId, ...msgData } = chat.messages[i]._doc
                newLastMsg = [{ userId: { _id, name, link }, ...msgData }]
                break
            }
        }
        await chat.save()
        if (sendUserSocket) socket.nsp.to(sendUserSocket.socketId).to(senderUserSocket.socketId).emit('msgDelete', { from, delForAll, chatId: chat._id, msgData: chat.messages, newLastMsg })
        if (!sendUserSocket) socket.nsp.to(senderUserSocket.socketId).emit('msgDelete', { from, delForAll, chatId: chat._id, msgData: chat.messages, newLastMsg })
    })
    // socket.on('joinToChat', ({ chatId, userLink }) => {
    //     console.log(socket.rooms)
    //     console.log(`${userLink} youi are in ${chatId}`)
    //     socket.join(chatId)
    // })
    // socket.on('leaveChat', (chatId) => {
    //     socket.leave(chatId)
    // })
    socket.on('logout', ({ socketId }) => {
        onlineUsers = onlineUsers.filter(el => el.socketId !== socketId)
        io.emit('returnOnlineUsers', onlineUsers)
    })
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(el => el.socketId !== socket.id)
        io.emit('returnOnlineUsers', onlineUsers)
    })
})

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/messenger?retryWrites=true&w=majority')
        server.listen(PORT, () => { console.log('server work') })
    } catch (e) {
        console.log(e)
    }
}

start() 