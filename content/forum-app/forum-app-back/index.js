require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes.js')
const sequelize = require('./db.js')
const models = require('./models.js')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routes)
const PORT = 5000

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()