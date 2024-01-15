const User = require('../models/User.js')
const Event = require('../models/Event.js')

class EventController {
    async createEvent(req, res) {
        try {
            const reqData = req.body
            const event = new Event(reqData)
            await event.save()
            return res.status(200).json({ msg: 'Успешно', data: event })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка создания события' })
        }
    }

    async deleteEvent(req, res) {
        try {
            const eventId = req.body.eventId
            const userId = req.body.userId
            const candidate = await Event.findById(eventId)
            if (!candidate) return res.status(400).json({ msg: 'Событие не найдено' })
            if (candidate.creator.toString() !== userId) return res.status(400).json({ msg: 'вы не автор' })
            await Event.findByIdAndDelete(eventId)
            return res.status(200).json({ msg: 'Успешно' })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка удаления' })
        }
    }

    async getEvents(req, res) {  // получить много событий
        try {
            const { eventsDataPage, eventQuery, selectedCity, selectedCategory } = req.body
            const itemsPerPage = 20
            let tape = []
            let eventsData = await Event.find({ city: selectedCity })
            eventsData = eventsData.filter((item) => item.title.toLowerCase().includes(eventQuery.toLowerCase()))
            if (selectedCategory !== '') eventsData = eventsData.filter((item) => item.category === selectedCategory)
            tape = eventsData.slice((eventsDataPage * itemsPerPage) - itemsPerPage, eventsDataPage * itemsPerPage)
            return res.status(200).json({ msg: 'Успешно', data: tape, length: eventsData.length, itemsPerPage })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска события' })
        }
    }

    async getEvent(req, res) {  // получить одно событие
        try {
            const eventId = req.params.id
            try {
                const candidate = await Event.findById(eventId)
                if (!candidate) return res.status(400).json({ msg: 'Событие не найдено' })
                return res.status(200).json({ msg: 'Успешно', data: candidate })
            } catch (err) {
                return res.status(400).json({ msg: 'Событие не найдено' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска события' })
        }
    }

    async getUserProposals(req, res) {
        try {
            let { userId, userEventsDataTape, eventQuery } = req.body
            if (!eventQuery) eventQuery = ''
            if (!userEventsDataTape) userEventsDataTape = 1
            const itemsPerTape = 3
            await Event.find({ creator: userId }).then(r => {
                let tapeArr = []
                let eventsData = []
                eventsData = r.filter(el => el.title.toLowerCase().includes(eventQuery.toLowerCase()) || el.text.toLowerCase().includes(eventQuery.toLowerCase()))
                tapeArr = eventsData.slice(0, userEventsDataTape * itemsPerTape)
                return res.status(200).json({ msg: 'Успешно', data: tapeArr, length: eventsData.length })
            }).catch(e => {
                res.status(400).json({ msg: 'не найден создатель события' })
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }

    async getMyEvents(req, res) {
        try {
            let { userId, date } = req.params
            let arr = []
            const userData = await User.findById(userId).then().catch(e => res.status(400).json({ msg: 'Пользователь не найден' }))
            for (let i = 0; i < userData.events.length; i++) {
                const event = await Event.findById(userData.events[i])
                arr.push(event)
            }
            if (date == -1) return res.status(200).json({ msg: 'Успешно', data: arr })
            arr = arr.filter(el => el.startDateAndTime.slice(0, 10) === date)
            return res.status(200).json({ msg: 'Успешно', data: arr })    
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }

    async getEventCreator(req, res) {
        try {
            let { userId } = req.params
            await User.findById(userId).then(r => res.status(200).json({ msg: 'Успешно', userData: r }))
                .catch(e => res.status(400).json({ msg: 'не найден создатель события' }))
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }

    async getParticipants(req, res) {
        try {
            const { eventId } = req.params
            const event = await Event.findById(eventId).catch(e => res.status(400).json({ msg: 'Событие не найдено' }))
            let participantsData = []
            for (let i = 0; i < event.participants.length; i++) {
                await User.findById(event.participants[i]).then(r => participantsData.push(r)).catch(e => { return 0 })
            }
            return res.status(200).json({ msg: 'Успешно', participantsData })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка создания события' })
        }
    }

    async participate(req, res) {
        try {
            const { userId, eventId } = req.body
            const event = await Event.findById(eventId).catch(e => res.status(400).json({ msg: 'Событие не найдено' }))
            const user = await User.findById(userId).catch(e => res.status(400).json({ msg: 'Пользователь не найден' }))
            event.participants.push(user._id)
            user.events.push(event._id)
            await event.save()
            await user.save()
            return res.status(200).json({ msg: 'Успешно', eventData: event, userData: user })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка создания события' })
        }
    }

    async cancelParticipate(req, res) {
        try {
            const { userId, eventId } = req.body
            const event = await Event.findById(eventId).catch(e => res.status(400).json({ msg: 'Событие не найдено' }))
            const user = await User.findById(userId).catch(e => res.status(400).json({ msg: 'Пользователь не найден' }))
            let filteredEvent = event.participants.filter(el => el.toString() !== userId.toString())
            let filteredUser = user.events.filter(el => el.toString() !== eventId.toString())
            event.participants = filteredEvent
            user.events = filteredUser
            await event.save()
            await user.save()
            return res.status(200).json({ msg: 'Успешно', eventData: event, userData: user })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка создания события' })
        }
    }

}

module.exports = new EventController()