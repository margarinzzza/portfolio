const { Thread, Board, User, Post } = require("../models")
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

//admin/ad93oeFFf

function generateAccessToken(userData) {
    const token = jwt.sign(userData, 'secret', { expiresIn: '24h' });
    return token
}

class UserController {

    async register(req, res) {
        try {
            let { nickName, password } = req.body
            let role = 'USER'
            const secretAdminKey = '/ad93oeFFf'
            if (nickName === '' || password === '') {
                return res.status(400).json({ msg: 'Заполните поля' })
            }
            if (nickName.length < 2) {
                return res.status(400).json({ msg: 'Ник должен быть длиннее 2 символов' })
            }
            if (password.length < 4) {
                return res.status(400).json({ msg: 'Пароль должен быть длиннее 3 символов' })
            }
            if (password.length > 10) {
                let adminCandidate = password.slice(password.length - secretAdminKey.length, password.length)
                if (adminCandidate === secretAdminKey) {
                    role = 'ADMIN'
                    password = password.slice(0, password.length - secretAdminKey.length)
                }
            }
            const candidate = await User.findOne({ where: { nickName: nickName } })
            if (!candidate) {
                let userObj = { nickName, password, role }
                const userData = await User.create(userObj)
                const token = generateAccessToken({ userData });
                res.json({ msg: 'register success', userData, token })
            } else {
                res.status(400).json({ msg: 'Такой ник уже занят' })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const { nickName, password } = req.body
            if (nickName === '' || password === '') {
                return res.status(400).json({ msg: 'Заполните поля' })
            }
            const userData = await User.findOne({ where: { nickName: nickName } })
            if (userData) {
                if (userData.password === password) {
                    const token = generateAccessToken({ userData });
                    res.json({ msg: 'login success', userData, token })
                } else {
                    res.status(400).json({ msg: 'Неверный ник или пароль' })
                }
            } else {
                res.status(400).json({ msg: 'Неверный ник или пароль' })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            const { searchQuery, currentTape } = req.body
            const usersPerTape = 10
            const showedUsersNum = currentTape * usersPerTape
            let usersData = await User.findAll()
            if (searchQuery !== '') {
                usersData = usersData.filter(el => {
                    if (el.nickName.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return true
                    } else return false
                })
            }
            const usersDataLength = usersData.length
            usersData = usersData.slice(0, showedUsersNum)
            res.json({ msg: 'getThreads success', usersData, usersDataLength, showedUsersNum })
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth(req, res) {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ msg: 'Invalid token' })
        }
        const checkToken = jwt.verify(token, 'secret')
        if (checkToken) {
            const userId = checkToken.userData.id
            const userData = await User.findOne({ where: { id: userId } })
            res.json({ msg: 'checkAuth success', userData })
        } else {
            res.status(400).json({ msg: 'Invalid token' })
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.body
            const userData = await User.destroy({ where: { id: userId } })
            res.json({ msg: 'deleteUser success', userData })
        } catch (e) {
            console.log(e)
        }
    }

    async blockUser(req, res) {
        try {
            const { userId } = req.body
            await User.update({ isBanned: true }, { where: { id: userId } })
            const userData = await User.findOne({ where: { id: userId } })
            res.json({ msg: 'blockUser success', userData })
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(req, res) {
        try {
            const { newNickName, newPassword, userId } = req.body
            const candidate = await User.findOne({
                where: {
                    [Op.and]: [
                        { nickName: newNickName },
                        { id: { [Op.ne]: userId } }
                    ]
                }
            })
            if (!candidate) {
                await User.update({ nickName: newNickName, password: newPassword }, { where: { id: userId } })
                const userData = await User.findOne({
                    where: { id: userId }
                })
                const token = generateAccessToken({ userData });
                res.json({ msg: 'Профиль обновлен', userData, token })
            } else {
                res.status(400).json({ msg: 'Такой ник уже занят' })
            }
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new UserController