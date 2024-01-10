import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    authStatus: 'loading',
    isAuth: false,
    userData: null,
    authError: '',
    authType: ''
}

export const registerUser = createAsyncThunk('createUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/createUser', params)
        window.localStorage.setItem('token', data.token)
        return data 
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const updateUser = createAsyncThunk('updateUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/updateUser', params)
        window.localStorage.removeItem('token')
        window.localStorage.setItem('token', data.token)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const login = createAsyncThunk('login', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/login', params)
        window.localStorage.setItem('token', data.token)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    } 
})

export const deleteUser = createAsyncThunk('deleteUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/deleteUser', params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const checkAuth = createAsyncThunk('checkAuth', async () => {
    try {
        const { data } = await axios.get('/checkAuth')
        return data
    } catch (e) {
        throw e
    }
})

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userData = null
                state.authStatus = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.userData = null
                state.isAuth = false
                state.authStatus = 'err'
            })

            .addCase(updateUser.pending, (state) => {
                state.userData = null
                state.authStatus = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.userData = null
                state.isAuth = false
                state.authStatus = 'err'
            })

            .addCase(deleteUser.pending, (state) => {
                state.userData = null
                state.authStatus = 'loading'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.authError = ''
                window.localStorage.removeItem('token')
                state.userData = []
                state.isAuth = false
                state.authStatus = 'loaded'
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.userData = null
                state.isAuth = false
                state.authStatus = 'err'
            })

            .addCase(login.pending, (state) => {
                state.userData = null
                state.authStatus = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(login.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.userData = null
                state.isAuth = false
                state.authStatus = 'err'
            })

            .addCase(checkAuth.pending, (state) => {
                //state.userData = null
                state.authStatus = 'loading'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                //state.authError = ''
                state.userData = action.payload.req
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.userData = null
                
                state.isAuth = false
                state.authStatus = 'err'
            })

    },
    reducers: {
        logout: (state) => {
            window.localStorage.removeItem('token')
            state.userData = null
            state.isAuth = false
        },
        setAuthError: (state, action) => {
            state.authError = action.payload
        },
        setAuthType: (state, action) => {
            state.authType = action.payload
        },
    }
})

export const authSliceActions = authSlice.actions
export default authSlice.reducer