const Router = require('express')
const EventController = require('./controllers/EventController.js')
const router = new Router
const UserController = require('./controllers/UserController.js')
const authMiddleware = require('./middlewares.js')

//User
router.post('/createUser', UserController.register) //регистрация
router.post('/login', UserController.login) //авторизация
router.post('/deleteUser', UserController.deleteUser) //удаление
router.post('/updateUser', authMiddleware, UserController.updateUser) //обновление
router.get('/getUser/:id', UserController.getUserById) //получить юзера
router.get('/checkAuth', authMiddleware) //получить мою страницу

//events
router.post('/createEvent', EventController.createEvent)
router.post('/deleteEvent', EventController.deleteEvent)
router.get('/getEvent/:id', EventController.getEvent)
router.post('/getEvents', EventController.getEvents)
router.post('/getUserEvents', EventController.getUserEvents) 

module.exports = router