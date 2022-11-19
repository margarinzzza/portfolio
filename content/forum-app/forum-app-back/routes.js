const Router = require('express')
const router = new Router()
const UserController = require('./controllers/userController.js')
const ThreadController = require('./controllers/threadController.js')
const BoardController = require('./controllers/boardController.js')
const PostsController = require('./controllers/postsController.js')

// user routes

router.post('/chechAuth', UserController.checkAuth)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.delete('/deleteUser', UserController.deleteUser)
router.delete('/updateUser', UserController.updateUser)

// boards routes

router.post('/createBoard', BoardController.createBoard)
router.get('/getBoards', BoardController.getBoards)
router.post('/getBoard', BoardController.getBoard)
router.delete('/deleteBoard', BoardController.deleteBoard)

// thread routes

router.post('/createThread', ThreadController.createThread)
router.get('/getThreads', ThreadController.getThreads)
router.post('/getThread', ThreadController.getThread)
router.delete('/deleteThread', ThreadController.deleteThread)

// posts routes

router.post('/createPost', PostsController.createPost)
router.get('/getPosts', PostsController.getPosts)
router.post('/getMyPosts', PostsController.getMyPosts)
router.delete('/deletePost', PostsController.deletePost)

module.exports = router