const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if (!req.headers.authorization) return res.status(400).json({ message: 'Пользователь не авторизован' })
        const token = bearer.replace('Bearer ', '')
        try {
            jwt.verify(token, 'SECRET_KEY')
            next()
        } catch (err) {
            return res.status(403).json({ msg: 'Нет доступа', err })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Не авторизованы' })
    }
}

module.exports = authMiddleware