const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
 
const generateJwtToken = (req) => {
    const payload = { req }
    return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24h' })
}

class UserController {
    async register(req, res) {
        try {
            const reqData = req.body
            const candidate = await User.findOne({ phone: reqData.phone })
            if (candidate) {
                return res.status(400).json({ msg: 'Пользователь с таким телефоном существует' })
            }
            const user = new User(reqData)
            await user.save()
            const token = generateJwtToken(user)
            return res.status(200).json({ msg: 'Успешно', token, data: user })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка регистрации' })
        }
    }
    async login(req, res) {
        try {
            const reqData = req.body
            const candidate = await User.findOne({ phone: reqData.phone })
            if (!candidate) {
                return res.status(400).json({ msg: 'Неверный телефон или пароль' })
            }
            if (candidate.password !== reqData.password) {
                return res.status(400).json({ msg: 'Неверный телефон или пароль' })
            }
            const token = generateJwtToken(candidate)
            return res.status(200).json({ msg: 'Успешно', token, data: candidate })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка входа' })
        }
    }
    async deleteUser(req, res) {
        try {
            const reqData = req.body
            const candidate = await User.findByIdAndDelete(reqData.id)
            if (!candidate) {
                return res.status(400).json({ msg: 'Пользователь не найден' })
            }
            return res.status(200).json({ msg: 'Успешно' })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка удаления' })
        }
    }

    async updateUser(req, res) {
        try {
            const newData = req.body
            const userData = await User.findById(newData.id)
            userData.name = newData.name
            userData.password = newData.password
            userData.avatarUrl = newData.avatarUrl
            userData.city = newData.city
            userData.age = newData.age
            userData.interests = newData.interests
            
            await userData.save()
            const token = generateJwtToken(userData)
            return res.status(200).json({ msg: 'Успешно', data: userData, token })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка обновления' })
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id
            try {
                const candidate = await User.findById(userId)
                const { password, alerts, ...userData } = candidate._doc
                return res.status(200).json({ msg: 'Успешно', userData })
            } catch (err) {
                return res.status(400).json({ msg: 'Пользователь не найден' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }
}

module.exports = new UserController()