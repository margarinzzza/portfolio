import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios.js'

const initialState = {
    showedBoardsNum: 0,
    boardsLength: 0,
    boardsLoadStatus: 'loading',
    boardLoadStatus: 'loading',
    searchQuery: '',
    currentTape: 1,
    boards: [],
    board: [],
    boardName: '',
    boardDesc: '',
    boardHref: '',
    createBoardError: '',
}

export const getBoards = createAsyncThunk('/getBoards', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/getBoards`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const createBoard = createAsyncThunk('/createBoard', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/createBoard`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getBoard = createAsyncThunk('/getBoard', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/getBoard/${params.boardHref}`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        loadMoreBoards: (state, action) => {
            state.currentTape += 1
        },
        setBoardName: (state, action) => {
            state.boardName = action.payload
        },
        setBoardDesc: (state, action) => {
            state.boardDesc = action.payload
        },
        setBoardHref: (state, action) => {
            state.boardHref = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: {
        [getBoards.pending]: (state) => {
            state.boardsLoadStatus = 'loading'
        },
        [getBoards.fulfilled]: (state, action) => {
            state.boards = action.payload.boardsData
            state.boardsLength = action.payload.boardsDataLength
            state.showedBoardsNum = action.payload.showedBoardsNum
            state.boardsLoadStatus = 'loaded'
        },
        [getBoards.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.boardsLoadStatus = 'err'
        },

        [getBoard.pending]: (state) => {
            state.boardLoadStatus = 'loading'
        },
        [getBoard.fulfilled]: (state, action) => {
            state.board = action.payload.boardData
            state.boardLoadStatus = 'loaded'
        },
        [getBoard.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.board = 'not found'
            state.boardLoadStatus = 'err'
        },

        [createBoard.pending]: (state) => {
        },
        [createBoard.fulfilled]: (state, action) => {
            state.boards.push(action.payload.boardData)
            state.boardName = ''
            state.boardDesc = ''
            state.boardHref = ''
            state.createBoardError = ''
        },
        [createBoard.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.createBoardError = action.payload.msg
        },

    }
})

export const boardReducerAction = boardSlice.actions

export default boardSlice.reducer