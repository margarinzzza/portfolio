const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' })
        }
        const decodedData = jwt.verify(token, 'SECRET_KEY')
        req.user = decodedData
        res.json({ message: 'Пользователь авторизован', userData: decodedData })
        next()
    } catch (err) {
        console.log(err)  
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
}