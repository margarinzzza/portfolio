import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import jwt_decode from 'jwt-decode'

const initialState = {
  authLoading: 'loaded',
  isAuth: false,
  registerError: '',
  loginError: '',
  userData: {}
}

export const login = createAsyncThunk('/login', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/login', params)
    localStorage.setItem('token', data.token)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const register = createAsyncThunk('/register', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/register', params)
    localStorage.setItem('token', data.token)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const checkAuth = createAsyncThunk('/checkAuth', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginError: (state, action) => {
      state.loginError = action.payload
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload
    },
    logout: (state, action) => {
      localStorage.removeItem('token')
      state.isAuth = false
      state.userData = []
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.authLoading = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.loginError = ''
      state.isAuth = true
      state.userData = action.payload.userData
      state.authLoading = 'loaded'
    },
    [login.rejected]: (state, action) => {
      state.loginError = action.payload.message
    },

    [register.pending]: (state) => {
      state.authLoading = 'loading'
    },
    [register.fulfilled]: (state, action) => {
      state.registerError = ''
      state.isAuth = true
      state.userData = action.payload.userData
      state.authLoading = 'loaded'
    },
    [register.rejected]: (state, action) => {
      state.registerError = action.payload.message
    },

    [checkAuth.pending]: (state) => {
      state.authLoading = 'loading'
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isAuth = true
      state.userData = action.payload.userData
      state.authLoading = 'loaded'
    },
    [checkAuth.rejected]: (state, action) => {
      console.log(action.payload.msg) 
    },
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer