const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const PORT = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
const server = createServer(app);
const io = new Server(server, {cors: {origin: '*', methods: ['GET', 'POST']}})
app.use('/', router);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/kto_kyda?retryWrites=true&w=majority')
        app.listen(PORT, () => { console.log('server work') })
    } catch (e) {
        console.log(e)
    }
}

start() 