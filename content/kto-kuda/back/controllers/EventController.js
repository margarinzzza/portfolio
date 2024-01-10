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
            const eventsData = await Event.find()
            return res.status(200).json({ msg: 'Успешно', data: eventsData })
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
                if (!candidate) {
                    return res.status(400).json({ msg: 'Событие не найдено' })
                }
                return res.status(200).json({ msg: 'Успешно', data: candidate })
            } catch (err) {
                return res.status(400).json({ msg: 'Событие не найдено' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска события' })
        }
    }

    async getUserEvents(req, res) {
        try {
            const userId = req.params.id
            try {
                const eventsData = await Event.find({ creator: userId })
                return res.status(200).json({ msg: 'Успешно', data: eventsData })
            } catch (err) {
                return res.status(400).json({ msg: 'События не найдены' })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }
}

module.exports = new EventController()