const User = require('../models/User.js')
const Chat = require('../models/Chat.js')

class ChatController {
    async createChat(req, res) {
        try {
            const { myId, userId, type } = req.body
            const creator = await User.findById(myId)
            const participant = await User.findById(userId)
            let participants = []
            participants.push(userId)
            const newChatData = { type, creator: myId, participants }
            const chat = new Chat(newChatData)
            await chat.save()
            creator.chats.push(chat._id)
            participant.chats.push(chat._id)
            await creator.save()
            await participant.save()
            return res.status(200).json({ msg: 'Успешно', chat, creator, participant })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка создания чата' })
        }
    }

    parseChatId = async (req, res) => {
        try {
            const { chatId } = req.params
            const chat = await Chat.findById(chatId)
            return res.status(200).json({ msg: 'Успешно', chat })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка пасинга чата' })
        }
    }

    getChats = async (req, res) => {
        try {
            const { userId, chatId, findChatQuery, currentTape } = req.body
            const user = await User.findById(userId)
            const itemsPerTape = 10
            let finalArr = [], tape = [], arrLength
            for (const chat of chatId) {
                const candidate = await Chat.findOne({ _id: chat }).populate('creator', 'name surname link').populate('participants').populate('messages.userId', 'name link').lean()
                if (candidate.messages.length > 0) {
                    for (let i = candidate.messages.length - 1; i >= 0; i--) {
                        const isDeleteForUser = candidate.messages[i].deleteFor.find(el => el.toString() === userId.toString())
                        if (!isDeleteForUser) {
                            candidate.messages = [candidate.messages[i]]
                            break
                        } 
                    }
                }
                let candidateName, candidateSurname, candidateLink
                if (candidate.type === 'personal') {
                    if (user._id.toString() === candidate.participants[0]._id.toString()) {
                        candidateName = candidate.creator.name.toUpperCase()
                        candidateSurname = candidate.creator.surname.toUpperCase()
                        candidateLink = candidate.creator.link.toUpperCase()
                    }
                    if (user._id.toString() === candidate.creator._id.toString()) {
                        candidateName = candidate.participants[0].name.toUpperCase()
                        candidateSurname = candidate.participants[0].surname.toUpperCase()
                        candidateLink = candidate.participants[0].link.toUpperCase()
                    }
                    if (candidateName.includes(findChatQuery.toUpperCase()) || candidateSurname.includes(findChatQuery.toUpperCase()) || candidateLink.includes(findChatQuery.toUpperCase())) finalArr.push(candidate)
                }
            }
            arrLength = finalArr.length
            tape = finalArr.slice(0, currentTape * itemsPerTape)
            return res.status(200).json({ msg: 'Успешно', tape, finalArr, arrLength })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка получения чатов' })
        }
    }

    async getMessages(req, res) {
        try {
            const { chatId, findMsgQuery, currentTape, userId } = req.body
            const itemsPerTape = 10
            const chatMsgsLength = await Chat.findById(chatId)
            let chat
            if (findMsgQuery === '') chat = await Chat.findOne({ _id: chatId }, { messages: { $slice: -(currentTape * itemsPerTape) } }).populate('messages.userId')
            if (findMsgQuery !== '') chat = await Chat.findOne({ _id: chatId }).populate('messages.userId')
            if (chat.messages.length > 0) {
                const candidate = chat.messages[chat.messages.length - 1].whoRead.find(el => el.toString() === userId.toString())
                if (!candidate) {
                    chat.messages[chat.messages.length - 1].whoRead.push(userId)
                    chat.markModified('messages')
                    await chat.save()
                }
            }
            const chatMessages = chat.messages
            let finalArr = [], arrLength
            if (chatMessages.length > 0) {
                for (const i of chatMessages) {
                    const { name, surname, link, avatarUrl, _id: userId } = i.userId
                    const { text, status, createdAt, updatedAt, isModified, _id, whoRead, deleteFor } = i
                    if (findMsgQuery !== '') if (i.text.toLowerCase().includes(findMsgQuery.toLowerCase())) finalArr.push({ _id, whoRead, userId, name, surname, link, avatarUrl, text, status, createdAt, updatedAt, isModified, deleteFor })
                    if (findMsgQuery === '') finalArr.push({ _id, whoRead, userId, name, surname, link, avatarUrl, text, status, createdAt, updatedAt, isModified, deleteFor })
                }
            }
            if (findMsgQuery === '') arrLength = chatMsgsLength.messages.length
            if (findMsgQuery !== '') arrLength = finalArr.length
            return res.status(200).json({ msg: 'Успешно', userId, chatId, messageData: finalArr, arrLength })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка получения сообщений' })
        }
    }

}

module.exports = new ChatController()