const User = require('./models/User.js')
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateJwtToken = (user) => {
    const payload = { user }
    return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24h' })
}

class authController {
    async registration(req, res) {
        try {
            const data = req.body
            const candidate = await User.findOne({ userName: data.userName })
            if (candidate) {
                return res.status(403).json({ message: 'That username already taken' })
            }
            // const salt = bcrypt.genSaltSync(5);
            // const passwordHash = bcrypt.hashSync(password, salt);
            const user = new User(data)
            await user.save()
            const token = generateJwtToken(user)
            return res.status(200).json({ message: 'register success', token, data: user })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'Register failed' })
        }
    }
    async login(req, res) {
        try {
            const { userName, password } = req.body
            const user = await User.findOne({ userName })
            if (!user) {
                return res.status(400).json({ message: 'Incorrect password or username' })
            } else if (user.password === password) {
                const token = generateJwtToken(user)
                return res.status(200).json({ message: 'login success', token, data: user })
            } else {
                return res.status(400).json({ message: 'Incorrect password or username' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'login failed' })
        }
    }
    async getUsers(_, res) {
        try {
            const users = await User.find()
            return res.json({ users })
        } catch (err) {
            console.log(err)
        }
    } 
 
    async updateProfile(req, res) {
        try {
            const params = req.body
            const newUser = await User.findOneAndUpdate({_id: params.userId}, params.registerUserData, { upsert: true, returnDocument: 'after' })
            const token = generateJwtToken(newUser)
            return res.status(200).json({ message: 'update success', token, data: newUser })
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProfile(req, res) {
        try {
            const { userId } = req.body
            await User.findByIdAndRemove(userId)
            return res.status(200).json({ message: 'success delete' })
        } catch (err) {
            console.log(err)
        }
    }


}

module.exports = new authController()