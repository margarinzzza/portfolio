const sequelize = require('./db.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickName: { type: DataTypes.STRING, unique: true },
    isBanned: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },
    postsNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    threadsNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Board = sequelize.define('board', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    href: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, unique: true },
    threadsNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    postsNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    desc: { type: DataTypes.TEXT },
})

const Thread = sequelize.define('thread', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imgSrc: { type: DataTypes.STRING, defaultValue: '' },
    boardId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    postsNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    creatorNickName: { type: DataTypes.STRING },
})

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    boardId: { type: DataTypes.INTEGER },
    threadId: { type: DataTypes.INTEGER },
    text: { type: DataTypes.TEXT },
    creatorNickName: { type: DataTypes.STRING },
})

module.exports = {
    User,
    Board,
    Thread,
    Post,
}