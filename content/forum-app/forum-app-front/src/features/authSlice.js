import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios.js'

const initialState = {
    isAuth: false,
    userData: [],
    loginError: '',
    registerError: '',
    redactProfileError: '',
    authLoadingStatus: 'loading'
}

export const login = createAsyncThunk('/login', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/login`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const register = createAsyncThunk('/register', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/register`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const checkAuth = createAsyncThunk('/checkAuth', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/checkAuth`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const deleteUser = createAsyncThunk('/deleteUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/deleteUser`, { data: params })
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const updateUser = createAsyncThunk('/updateUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/updateUser`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.userData = []
            state.loginError = ''
            state.registerError = ''
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.authLoadingStatus = 'loading'
        },
        [register.fulfilled]: (state, action) => {
            state.userData = action.payload.userData
            state.isAuth = true
            state.authLoadingStatus = 'loaded'
            state.registerError = ''
            localStorage.setItem('token', action.payload.token);
        },
        [register.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.registerError = action.payload.msg
            state.isAuth = false
            state.authLoadingStatus = 'err'
        },

        [login.pending]: (state) => {
            state.authLoadingStatus = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.userData = action.payload.userData
            state.isAuth = true
            state.authLoadingStatus = 'loaded'
            state.loginError = ''
            localStorage.setItem('token', action.payload.token);
        },
        [login.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.loginError = action.payload.msg
            state.isAuth = false
            state.authLoadingStatus = 'err'
        },

        [checkAuth.pending]: (state) => {
            state.authLoadingStatus = 'loading'
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.userData = action.payload.userData
            state.isAuth = true
            state.authLoadingStatus = 'loaded'
        },
        [checkAuth.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.isAuth = false
            state.authLoadingStatus = 'err'
        },

        [deleteUser.pending]: (state) => {
        },
        [deleteUser.fulfilled]: (state, action) => {
            localStorage.removeItem('token')
            state.userData = []
            state.isAuth = false
        },
        [deleteUser.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.isAuth = false
        },

        [updateUser.pending]: (state) => {
            state.authLoadingStatus = 'loading'
        },
        [updateUser.fulfilled]: (state, action) => {
            state.userData = action.payload.userData
            localStorage.removeItem('token')
            localStorage.setItem('token', action.payload.token)
            state.redactProfileError = ''
            state.authLoadingStatus = 'loaded'
        },
        [updateUser.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.redactProfileError = action.payload.msg
            state.authLoadingStatus = 'err'
        },
    }
})

export const authReducerAction = authSlice.actions

export default authSlice.reducer