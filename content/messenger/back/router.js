const Router = require('express')
const ChatController = require('./controllers/ChatController.js')
const router = new Router
const UserController = require('./controllers/UserController.js')
const authMiddleware = require('./middlewares.js')

//User
router.post('/register', UserController.register) 
router.post('/login', UserController.login) 
router.post('/deleteUser', authMiddleware, UserController.deleteUser) 
router.post('/updateUser', authMiddleware, UserController.updateUser) 
router.get('/getUser/:id', authMiddleware, UserController.getUserById) 
router.post('/getUsers', authMiddleware, UserController.getUsers) 
router.get('/refreshMe', authMiddleware, UserController.refreshMe) //обновить мою страницу

//friends and offers
router.post('/offerFriendship', authMiddleware, UserController.offerFriendship) 
router.post('/cancelOfferFriendship', authMiddleware, UserController.cancelOfferFriendship) 
router.get('/getMyOffersData/:userId', authMiddleware, UserController.getMyOffersData)  
router.post('/acceptOfferFriendship', authMiddleware, UserController.acceptOfferFriendship) 
router.post('/getMyFriends', authMiddleware, UserController.getMyFriends) 
router.post('/deleteFriend', authMiddleware, UserController.deleteFriend) 

//chat and msg
router.post('/createChat', authMiddleware, ChatController.createChat)
router.post('/getMessages', authMiddleware, ChatController.getMessages)
router.post('/getChats', authMiddleware, ChatController.getChats)

router.get('/parseChatId/:chatId', authMiddleware, ChatController.parseChatId)

module.exports = router 