const Router = require('express')
const EventController = require('./controllers/EventController.js')
const router = new Router
const UserController = require('./controllers/UserController.js')
const authMiddleware = require('./middlewares.js')

//User
router.post('/createUser', UserController.register) //регистрация
router.post('/login', UserController.login) //авторизация
router.post('/deleteUser', authMiddleware, UserController.deleteUser) //удаление
router.post('/updateUser', authMiddleware, UserController.updateUser) //обновление
router.get('/getUser/:id', UserController.getUserById) //получить юзера
router.get('/refreshMe', UserController.refreshMe) //обновить мою страницу

//events
router.post('/createEvent', authMiddleware, EventController.createEvent)
router.post('/deleteEvent', authMiddleware, EventController.deleteEvent)
router.get('/getEvent/:id', EventController.getEvent)
router.post('/getEvents', EventController.getEvents)
router.post('/getUserEvents', EventController.getUserEvents)
router.get('/getEventCreator/:userId', EventController.getEventCreator)
router.get('/getParticipants/:eventId', EventController.getParticipants)

router.post('/participate', authMiddleware, EventController.participate)
router.post('/cancelParticipate', authMiddleware, EventController.cancelParticipate)


module.exports = router 