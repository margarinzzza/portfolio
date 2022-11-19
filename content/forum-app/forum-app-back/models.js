const sequelize = require('./db.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickName: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Board = sequelize.define('board', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    href: { type: DataTypes.STRING, unique: true },
    title: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
})

const Thread = sequelize.define('thread', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    boardId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    creatorId: { type: DataTypes.INTEGER },
})

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    threadId: { type: DataTypes.INTEGER },
    text: { type: DataTypes.TEXT },
    creatorId: { type: DataTypes.INTEGER },
})

module.exports = {
    User,
    Board,
    Thread,
    Post,
}