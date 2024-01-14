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
            const itemsPerPage = 9
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

    async getUserEvents(req, res) {
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
                res.status(400).json({ msg: 'не найден создатель события'})
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: 'Ошибка поиска' })
        }
    }
}

module.exports = new EventController()