const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router.js')
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/', router) 
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => { console.log('server work') })
    } catch (e) {
        console.log(e)
    }
}

start()