import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    adress: { adressData: [], selectedAdressIdx: 0 },
    registerData: [],
    loginData: [],
    authStatus: 'loading',
    isAuth: false,
    userData: null,
    authError: '',

}

export const registerUser = createAsyncThunk('register', async (params, { rejectWithValue }) => {
    return await axios.post(`/register`, params).then(response => {
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const updateUser = createAsyncThunk('updateUser', async (params, { rejectWithValue }) => {
    return await axios.post(`/updateUser`, params).then(response => {
        window.localStorage.removeItem('token')
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const login = createAsyncThunk('login', async (params, { rejectWithValue }) => {
    return await axios.post(`/login`, params).then(response => {
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const deleteUser = createAsyncThunk('deleteUser', async (params, { rejectWithValue }) => {
    return await axios.post(`/deleteUser`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const refreshMe = createAsyncThunk('refreshMe', async () => {
    return await axios.get(`/refreshMe`).then(response => response.data).catch(e => { throw e })
})


export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
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
                state.authStatus = 'loaded'
            })

            .addCase(login.pending, (state) => {
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
                state.authStatus = 'loaded'
            })

            .addCase(refreshMe.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(refreshMe.fulfilled, (state, action) => {
                if (action.payload === null) {
                    state.userData = null
                    state.isAuth = false
                } else {
                    state.userData = action.payload
                    state.isAuth = true
                }
                state.authStatus = 'loaded'
            })
            .addCase(refreshMe.rejected, (state, action) => {
                state.userData = null
                state.isAuth = false
                state.authStatus = 'loaded'
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
        setRegisterData: (state, action) => {
            const { value, name } = action.payload
            const newData = { ...current(state.registerData), [name]: value }
            state.registerData = newData
        },
        setLoginData: (state, action) => {
            const { value, name } = action.payload
            const newData = { ...current(state.loginData), [name]: value }
            state.loginData = newData
        },
        setAdress: (state, action) => {
            state.adress.adressData = action.payload
        },
        setSelectedAdress: (state, action) => {
            state.adress.selectedAdressIdx = action.payload
        },
        addAdress: (state, action) => {
            state.adress.adressData.push(action.payload)
        },
        selectAdress: (state, action) => {
            state.adress.selectedAdressIdx = action.payload
        },
    }
})

export const authSliceActions = authSlice.actions
export default authSlice.reducer