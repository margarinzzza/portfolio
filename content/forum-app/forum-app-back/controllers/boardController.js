const { Thread, Board, User, Post } = require("../models")
const { Op } = require("sequelize");

class BoardController {

    async createBoard(req, res) {
        try {
            const { boardName, boardDesc, boardHref } = req.body
            if (boardName === '' || boardDesc === '' || boardHref === '') {
                return res.status(400).json({ msg: 'Заполните все поля' })
            }
            const findExistName = await Board.findOne({
                where: { name: boardName }
            })
            if (findExistName) {
                return res.status(400).json({ msg: 'Доска с таким именем уже существует' })
            }
            const findExistHref = await Board.findOne({
                where: { href: boardHref }
            })
            if (findExistHref) {
                return res.status(400).json({ msg: 'Доска с такой ссылкой уже существует' })
            }
            const boardData = await Board.create({ name: boardName, desc: boardDesc, href: boardHref })
            res.json({ msg: 'createBoard success', boardData })
        } catch (e) {
            console.log(e)
        }
    }

    async getBoards(req, res) {
        try {
            const boardsPerTape = 10
            const { currentTape, searchQuery } = req.body
            const showedBoardsNum = currentTape * boardsPerTape
            let boardsData = await Board.findAll()
            if (searchQuery !== '') {
                boardsData = boardsData.filter(el => {
                    if (el.name.toLowerCase().includes(searchQuery.toLowerCase()) || el.href.toLowerCase().includes(searchQuery.toLowerCase()) || el.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return true
                    } else return false
                })
            }
            const boardsDataLength = boardsData.length
            boardsData = boardsData.slice(0, showedBoardsNum)
            res.json({ msg: 'getBoard success', boardsData, boardsDataLength, showedBoardsNum })
        } catch (e) {
            console.log(e)
        }
    }

    async getBoard(req, res) {
        try {
            const { boardHref } = req.params
            const boardData = await Board.findOne({ where: { href: boardHref } })
            if (boardData) {
                res.json({ msg: 'getBoard success', boardData })
            } else {
                res.status(404).json({ msg: 'Доска не найдена' })
            }

        } catch (e) {
            console.log(e)
        }
    }

    async deleteBoard(req, res) {
        try {
            const { boardId } = req.body
            const boardData = await Board.destroy({ where: { id: boardId } })
            res.json({ msg: 'deleteBoard success', boardData })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new BoardController