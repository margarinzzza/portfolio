import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios.js'

const initialState = {
    showedThreadsNum: 0,
    threadsLength: 0,
    threadsLoadStatus: 'loading',
    threadLoadStatus: 'loading',
    searchQuery: '',
    currentTape: 1,
    threads: [],
    thread: [],
    threadName: '',
    threadDesc: '',
    createThreadError: '',
}

export const getThreads = createAsyncThunk('/getThreads', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/getThreads`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const createThread = createAsyncThunk('/createThread', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/createThread`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getThread = createAsyncThunk('/getThread', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/getThread/${params.threadId}`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        loadMoreThreads: (state, action) => {
            state.currentTape += 1
        },
        setThreadName: (state, action) => {
            state.threadName = action.payload
        },
        setThreadDesc: (state, action) => {
            state.threadDesc = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: {
        [getThreads.pending]: (state) => {
            state.threadsLoadStatus = 'loading'
        },
        [getThreads.fulfilled]: (state, action) => {
            state.threads = action.payload.threadsData
            state.threadsLength = action.payload.threadsDataLength
            state.showedThreadsNum = action.payload.showedThreadsNum
            state.threadsLoadStatus = 'loaded'
        },
        [getThreads.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.threadsLoadStatus = 'err'
        },

        [getThread.pending]: (state) => {
            state.threadLoadStatus = 'loading'
        },
        [getThread.fulfilled]: (state, action) => {
            state.thread = action.payload.threadData
            state.threadLoadStatus = 'loaded'
        },
        [getThread.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.thread = 'not found'
            state.threadLoadStatus = 'err'
        },

        [createThread.pending]: (state) => {
        },
        [createThread.fulfilled]: (state, action) => {
            state.threads.push(action.payload.threadData)
            state.threadName = ''
            state.threadDesc = ''
            state.createThreadError = ''
        },
        [createThread.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.createThreadError = action.payload.msg
        },

    }
})

export const threadReducerAction = threadSlice.actions

export default threadSlice.reducer