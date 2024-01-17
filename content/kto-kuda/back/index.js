const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 5000
const Event = require('./models/Event.js')
const User = require('./models/User.js')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/', router)

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })
io.on('connection', (socket) => {
    socket.on('join', ({eventId, userName}) => {
        socket.join(eventId)
        //socket.broadcast.to(eventId).emit('joinMsg', `К нам присоединился ${userName}`)
    })
    
    socket.on('sendMsg', async ({ userId, text, eventId }) => {
        const event = await Event.findById(eventId)
        const user = await User.findById(userId)
        const msgData = { userId, userName: user.name, userAva: '', text }
        event.chat.push(msgData)
        await event.save()
        socket.broadcast.to(eventId).emit('refreshChat', event)
    })

    io.on('disconnect', () => {
        console.log('disconnect')
    })
})


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/kto_kyda?retryWrites=true&w=majority')
        server.listen(PORT, () => { console.log('server work') })
    } catch (e) {
        console.log(e)
    }
}

start() 