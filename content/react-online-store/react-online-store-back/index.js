require('dotenv').config()
const cors = require('cors')
const routes = require('./routes.js')
const express = require('express')
const bodyParser = require('body-parser');
const models = require('./models/models.js')
const sequelize = require('./db.js')
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/', routes);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`server start on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    } 
}

start()