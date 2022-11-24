const { Thread, Board, User, Post } = require("../models")

class ThreadController {

    async createThread(req, res) {
        try {
            const { name, desc, creatorNickName, boardId, userId } = req.body
            if (userId !== 'Аноним') {
                const user = await User.findByPk(userId)
                const userCreatedThreads = user.threadsNum + 1
                await User.update({ threadsNum: userCreatedThreads }, { where: { id: userId } })
            }
            const board = await Board.findByPk(boardId)
            const boardThreadsNum = board.threadsNum + 1
            await Board.update({ threadsNum: boardThreadsNum }, { where: { id: boardId } })
            const threadData = await Thread.create({ name, desc, creatorNickName, boardId })
            res.json({ msg: 'createThread success', threadData })
        } catch (e) {
            console.log(e)
        }
    }

    async getThreads(req, res) {
        try {
            const { boardId, searchQuery, currentTape } = req.body
            const threadsPerTape = 10
            const showedThreadsNum = currentTape * threadsPerTape
            let threadsData = await Thread.findAll({ where: { boardId } })
            if (searchQuery !== '') {
                threadsData = threadsData.filter(el => {
                    if (el.name.toLowerCase().includes(searchQuery.toLowerCase()) || el.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return true
                    } else return false
                })
            }
            const threadsDataLength = threadsData.length
            threadsData = threadsData.slice(0, showedThreadsNum)
            res.json({ msg: 'getThreads success', threadsData, threadsDataLength, showedThreadsNum })
        } catch (e) {
            console.log(e)
        }
    }

    async getThread(req, res) {
        try {
            const { threadId } = req.params
            const threadData = await Thread.findByPk(threadId)
            if(threadData){
                res.json({ msg: 'getThread success', threadData })
            } else {
                res.status(404).json({ msg: 'Тред не найден' })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async deleteThread(req, res) {
        try {
            const { threadId } = req.body
            const threadData = await Thread.destroy({ where: { id: threadId } })
            res.json({ msg: 'deleteThread success', threadData })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new ThreadController