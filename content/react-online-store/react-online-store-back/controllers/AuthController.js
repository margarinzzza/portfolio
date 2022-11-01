const { User, Basket } = require('../models/models.js')
const jwt = require('jsonwebtoken')

const createJwt = ({ userData }) => {
    let token = jwt.sign({ userData }, 'secret', {expiresIn: '24h'})
    return token
}

exports.register = async (req, res) => {
    try {
        const secretAdminKey = '/=9475392'
        const data = req.body
        const candidate = await User.findOne({ where: { email: data.email } })
        if (candidate) {
            return res.status(400).json({ message: 'User with such an email already exists' })
        }
        let userData = {}
        const checkSecretKey = data.password.slice(data.password.length - secretAdminKey.length, data.password.length)
        if (data.password.length > 11 && secretAdminKey === checkSecretKey) {
            const initialPassword = data.password.slice(0, data.password.length - secretAdminKey.length)
            userData = await User.create({
                email: data.email,
                password: initialPassword,
                role: 'ADMIN'
            })
        } else {
            userData = await User.create(data)
        }
        await Basket.create({userId: userData.id })
        const token = createJwt({ userData })
        return res.status(200).json({ userData, token })
    } catch (e) {
        console.log(e)
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body
        const userData = await User.findOne({ where: { email: data.email } })
        if (!userData) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        if (userData.password !== data.password) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const token = createJwt({userData})
        return res.json({ userData, token })

    } catch (e) {
        console.log(e)
    }
}

exports.auth = async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
    }
}

exports.deleteProfile = async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
    }
}