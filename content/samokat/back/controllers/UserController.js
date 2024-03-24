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
            const checkEmail = await User.findOne({ email: reqData.email })
            if (checkEmail) return res.status(400).json({ msg: 'Пользователь с таким email существует' })
            const checkLink = await User.findOne({ link: reqData.link })
            if (checkLink) return res.status(400).json({ msg: 'Пользователь с таким никнеймом существует' })
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
            const candidate = await User.findOne({ email: reqData.email })
            if (!candidate) return res.status(400).json({ msg: 'Неверный email или пароль' })
            if (candidate.password !== reqData.password) return res.status(400).json({ msg: 'Неверный email или пароль' })
            const token = generateJwtToken(candidate)
            return res.status(200).json({ msg: 'Успешно', token, data: candidate })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка входа' })
        }
    }
    async deleteUser(req, res) {
        try {
            const {userId} = req.body
            const candidate = await User.findByIdAndDelete(userId)
            if (!candidate) return res.status(400).json({ msg: 'Пользователь не найден' })
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
            userData.surname = newData.surname
            userData.password = newData.password
            userData.avatarUrl = newData.avatarUrl
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
                const { password, ...userData } = candidate._doc
                return res.status(200).json({ msg: 'Успешно', userData })
            } catch (err) {
                return res.status(400).json({ msg: 'Пользователь не найден' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }

    async offerFriendship(req, res) {
        try {
            const { inviterId, invitedId } = req.body
            const inviterUser = await User.findById(inviterId) //тот кто пригласил дружить
            const invitedUser = await User.findById(invitedId) //тот кого пригласили дружить
            inviterUser.myFriendOffers.push(invitedId)
            invitedUser.friendOffers.push(inviterId)
            await inviterUser.save()
            await invitedUser.save()
            return res.status(200).json({ msg: 'Успешно', updatedData: inviterUser.myFriendOffers })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'не удалось пригласить дружить' })
        }
    }

    async cancelOfferFriendship(req, res) {
        try {
            const { inviterId, invitedId } = req.body
            const inviterUser = await User.findById(inviterId) //тот кто пригласил дружить
            const invitedUser = await User.findById(invitedId) //тот кого пригласили дружить
            inviterUser.myFriendOffers = inviterUser.myFriendOffers.filter(el => el.toString() !== invitedId.toString())
            invitedUser.friendOffers = inviterUser.myFriendOffers.filter(el => el.toString() !== inviterId.toString())
            await inviterUser.save()
            await invitedUser.save()
            return res.status(200).json({ msg: 'Успешно', updatedData: inviterUser })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'не удалось отменить приглашение на дружбу' })
        }
    }

    async deleteFriend(req, res) {
        try {
            const { removerId, removableId } = req.body
            const remover = await User.findById(removerId) //тот кто удаляет
            const removable = await User.findById(removableId) //тот кого удаляют
            remover.friends = remover.friends.filter(el => el.toString() !== removableId.toString())
            removable.friends = removable.friends.filter(el => el.toString() !== removerId.toString())
            await remover.save()
            await removable.save()
            return res.status(200).json({ msg: 'Успешно', updatedData: remover.friends })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'не удалось удалить из друзей' })
        }
    }

    async getUsers(req, res) {
        try {
            const { findUsersQuery, currentTape, userId, friendsData } = req.body
            const itemsPerTape = 10
            let arrLength, userData
            let tape = []
            try {
                if (findUsersQuery === 'ALL') userData = await User.find({ _id: { $ne: userId } })
                if (findUsersQuery !== 'ALL') {
                    const nameQuery = { name: new RegExp(findUsersQuery, 'i') }
                    const surnameQuery = { surname: new RegExp(findUsersQuery, 'i') }
                    const linkQuery = { link: new RegExp(findUsersQuery, 'i') }
                    userData = await User.find({ $or: [nameQuery, surnameQuery, linkQuery], _id: { $ne: userId } })
                }
                friendsData.forEach(i => userData = userData.filter(j => j._id.toString() !== i._id))
                arrLength = userData.length
                tape = userData.slice(0, currentTape * itemsPerTape)
                tape.forEach((el, idx) => {
                    const { name, surname, link, avatarUrl, _id, ...other } = tape[idx]
                    tape[idx] = { name, surname, avatarUrl, _id, link }
                })
                return res.status(200).json({ msg: 'Успешно', userData: tape, arrLength })
            } catch (err) {
                return res.status(400).json({ msg: 'Пользователи не найдены' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска пользователей' })
        }
    }

    async getMyOffersData(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findById(userId)
            let sendedOffers = []
            let gettedOffers = []
            await user.populate('friendOffers').then(el => gettedOffers = el.friendOffers)
            await user.populate('myFriendOffers').then(el => sendedOffers = el.myFriendOffers)
            return res.status(200).json({ msg: 'Успешно', sendedOffers, gettedOffers })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска пользователей' })
        }
    }

    async acceptOfferFriendship(req, res) {
        try {
            const { inviterId, invitedId } = req.body
            const inviterUser = await User.findById(inviterId) //тот кто пригласил дружить
            const invitedUser = await User.findById(invitedId) //тот кого пригласили дружить
            inviterUser.myFriendOffers = inviterUser.myFriendOffers.filter(el => el.toString() !== invitedId.toString())
            invitedUser.friendOffers = inviterUser.myFriendOffers.filter(el => el.toString() !== inviterId.toString())
            invitedUser.friends.push(inviterId)
            inviterUser.friends.push(invitedId)
            await inviterUser.save()
            await invitedUser.save()
            return res.status(200).json({ msg: 'Успешно', friendOffers: inviterUser.myFriendOffers, friends: invitedUser.friends })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'не удалось принять дружбу' })
        }
    }

    async getMyFriends(req, res) {
        try {
            const { findMyFriendsQuery, currentTape, userId } = req.body
            const itemsPerTape = 10
            let arrLength
            let tape = []
            let arr = []
            try {
                const userData = await User.findById(userId)
                if (findMyFriendsQuery === 'ALL') {
                    for (let i = 0; i < userData.friends.length; i++) {
                        const candidate = await User.findById(userData.friends[i])
                        if (candidate !== null) arr.push(candidate)
                    }
                } else {
                    const nameQuery = { name: new RegExp(findMyFriendsQuery, 'i') }
                    const surnameQuery = { surname: new RegExp(findMyFriendsQuery, 'i') }
                    const linkQuery = { link: new RegExp(findMyFriendsQuery, 'i') }
                    for (let i = 0; i < userData.friends.length; i++) {
                        const candidate = await User.findOne({ _id: userData.friends[i], $or: [nameQuery, surnameQuery, linkQuery], _id: { $ne: userId } })
                        if (candidate !== null) arr.push(candidate)
                    }
                }
                tape = arr.slice(0, currentTape * itemsPerTape)
                for (let i = 0; i < tape.length; i++) {
                    const { name, surname, link, avatarUrl, _id, ...other } = tape[i]
                    tape[i] = { name, surname, avatarUrl, _id, link }
                }
                arrLength = userData.friends.length
                return res.status(200).json({ msg: 'Успешно', friendsData: tape, arrLength })
            } catch (err) {
                return res.status(400).json({ msg: 'Пользователи не найдены' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска пользователей' })
        }
    }

    async refreshMe(req, res) {
        try {
            const bearer = req.headers.authorization
            if (!req.headers.authorization) return res.status(400).json({ message: 'Пользователь не авторизован' })
            const token = bearer.replace('Bearer ', '')
            try {
                const decodedData = jwt.verify(token, 'SECRET_KEY')
                const user = await User.findById(decodedData.req._id)
                res.status(200).json(user)
            } catch (err) {
                return res.status(403).json({ msg: 'Нет доступа', err })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Не авторизованы' })
        }
    }

}

module.exports = new UserController()