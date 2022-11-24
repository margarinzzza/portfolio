const { Thread, Board, User, Post } = require("../models")

class postController {

    async createPost(req, res) {
        const { threadId, boardId, creatorNickName, text, userId } = req.body
        if (text !== '') {

            if (userId !== 'Аноним') {
                const user = await User.findByPk(userId)
                const userCreatedPosts = user.threadsNum + 1
                await User.update({ postsNum: userCreatedPosts }, { where: { id: userId } })
            }

            const board = await Board.findByPk(boardId)
            const thread = await Thread.findByPk(threadId)

            const boardPostsNum = board.postsNum + 1
            const threadPostsNum = thread.postsNum + 1
  
            await Board.update({ postsNum: boardPostsNum }, { where: { id: boardId } })
            await Thread.update({ postsNum: threadPostsNum }, { where: { id: threadId } })

            const postData = await Post.create({ threadId, boardId, creatorNickName, text })
            res.json({ msg: 'createPost success', postData })
        } else {
            res.status(400).json({ msg: 'Введите текст' })
        }
    }

    async getPosts(req, res) {
        try {
            const { threadId } = req.body
            const postsData = await Post.findAll({ where: { threadId: threadId } })
            res.json({ msg: 'getPosts success', postsData })
        } catch (e) {
            console.log(e)
        }
    }

    async getPostsNum(req, res) {
        try {
            const postsData = await Post.findAll()
            const postsNum = postsData.length
            res.json({ msg: 'getPostsNum success', postsNum })
        } catch (e) {
            console.log(e)
        }
    }

    async getMyPosts(req, res) {

    }

    async deletePost(req, res) {

    }

}

module.exports = new postController