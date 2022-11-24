import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios.js'

const initialState = {
    usersData: [],
    searchQuery: '',
    usersLoadingStatus: '',
    currentTape: 1,
    usersDataLength: 0,
    showedUsersNum: 0,
}

export const blockUser = createAsyncThunk('/blockUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/blockUser`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getUsers = createAsyncThunk('/getUsers', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/getUsers`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        loadMoreUsers: (state, action) => {
            state.currentTape += 1
        },
    },
    extraReducers: {

        [blockUser.pending]: (state) => {
            state.usersLoadingStatus = 'loading'
        },
        [blockUser.fulfilled]: (state, action) => {
            const userId = action.payload.userData.id
            let newUsersData = state.usersData
            let blokedUserIdx = newUsersData.findIndex(el => el.id === userId)
            newUsersData[blokedUserIdx].isBanned = true
            state.blokedUserIdx = newUsersData
            state.usersLoadingStatus = 'loaded'
        },
        [blockUser.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.usersLoadingStatus = 'err'
        },

        [getUsers.pending]: (state) => {
            state.usersLoadingStatus = 'loading'
        },
        [getUsers.fulfilled]: (state, action) => {
            state.usersData = action.payload.usersData
            state.usersDataLength = action.payload.usersDataLength
            state.showedUsersNum = action.payload.showedUsersNum
            state.usersLoadingStatus = 'loaded'
        },
        [getUsers.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.usersLoadingStatus = 'err'
        },

    }
})

export const adminReducerAction = adminSlice.actions

export default adminSlice.reducer