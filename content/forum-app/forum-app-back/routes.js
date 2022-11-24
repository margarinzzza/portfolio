const Router = require('express')
const router = new Router()
const UserController = require('./controllers/userController.js')
const ThreadController = require('./controllers/threadController.js')
const BoardController = require('./controllers/boardController.js')
const PostController = require('./controllers/postsController.js')

// user routes

router.post('/checkAuth', UserController.checkAuth)
router.post('/login', UserController.login)
router.post('/getUsers', UserController.getUsers)
router.post('/register', UserController.register)
router.post('/blockUser', UserController.blockUser)
router.delete('/deleteUser', UserController.deleteUser)
router.put('/updateUser', UserController.updateUser)

// boards routes

router.post('/createBoard', BoardController.createBoard)
router.post('/getBoards', BoardController.getBoards)
router.get('/getBoard/:boardHref', BoardController.getBoard)
router.delete('/deleteBoard', BoardController.deleteBoard)

// thread routes

router.post('/createThread', ThreadController.createThread)
router.post('/getThreads', ThreadController.getThreads)
router.get('/getThread/:threadId', ThreadController.getThread)
router.delete('/deleteThread', ThreadController.deleteThread)

// posts routes

router.post('/createPost', PostController.createPost)
router.post('/getPosts', PostController.getPosts)
router.get('/getPostsNum', PostController.getPostsNum)
router.get('/getMyPosts/:id', PostController.getMyPosts)
router.delete('/deletePost', PostController.deletePost)

module.exports = router