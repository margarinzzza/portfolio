const Router = require('express')
const router = new Router()
const authController = require('./authController.js')
const postController = require('./postController.js')
const chatController = require('./chatController.js')
const authMiddleware = require('./middlewares/authMiddleware.js')

router.post('/register', authController.registration)
router.post('/login', authController.login)
router.get('/getMe', authMiddleware)
router.get('/getUsers', authController.getUsers)
router.post('/updateProfile', authController.updateProfile)
router.post('/deleteProfile', authController.deleteProfile)

router.post('/createPost', postController.createPost)
router.post('/deletePost', postController.deletePost)
router.get('/getAllPosts', postController.getAllPosts)
router.post('/getMyPosts', postController.getMyPosts)

router.post('/createChat', chatController.createChat)
router.get('/getAllChats', chatController.getAllChats)
router.post('/getMyChats', chatController.getMyChats)
router.post('/sendMessage', chatController.sendMessage)
router.post('/getMessages', chatController.getMessages)

module.exports = router