import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  status: 'loading',
  isAuth: false,
  userData: null,
  registerError: '',
  loginError: '',
  updateError: '',
  selectedNavItem: ''
}

export const registerUser = createAsyncThunk('auth/registerUser', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/register', params)
    window.localStorage.setItem('token', data.token)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/login', params)
    window.localStorage.setItem('token', data.token)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/updateProfile', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deleteProfile = createAsyncThunk('auth/deleteProfile', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/deleteProfile', { userId })
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const checkUser = createAsyncThunk('auth/checkUser', async () => {
  const { data } = await axios.get('/getMe')
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.userData = null
      state.status = 'loading'
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userData = action.payload.data
      state.isAuth = true
      state.status = 'loaded'
    },
    [registerUser.rejected]: (state, action) => {
      state.registerError = action.payload.message
      state.userData = null
      state.isAuth = false
      state.status = 'err'
    },

    [loginUser.pending]: (state) => {
      state.userData = null
      state.status = 'loading'
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userData = action.payload.data
      state.isAuth = true
      state.status = 'loaded'
    },
    [loginUser.rejected]: (state, action) => {
      state.loginError = action.payload.message
      state.userData = null
      state.isAuth = false
      state.status = 'err'
    },

    [checkUser.pending]: (state) => {
      state.userData = null
      state.status = 'loading'
    },
    [checkUser.fulfilled]: (state, action) => {
      state.userData = action.payload.userData.user
      state.isAuth = true
      state.status = 'loaded'
    },
    [checkUser.rejected]: (state, action) => {
      state.userData = null
      state.isAuth = false
      state.status = 'err'
    },

    [updateProfile.pending]: (state) => {
      state.status = 'loading'
    },
    [updateProfile.fulfilled]: (state, action) => {
      window.localStorage.removeItem('token')
      window.localStorage.setItem('token', action.payload.token)
      state.userData = action.payload.data
      state.status = 'loaded'
    },
    [updateProfile.rejected]: (state, action) => {
      state.status = 'err'
    },

    [deleteProfile.pending]: (state) => {
      state.userData = null
      state.status = 'loading'
    },
    [deleteProfile.fulfilled]: (state, action) => {
      state.userData = null
      state.isAuth = false
      state.status = 'loaded'
    },
    [deleteProfile.rejected]: (state, action) => {
      // state.userData = null
      // state.isAuth = false
      state.status = 'err'
    },
  },
  reducers: {
    logout: (state) => {
      state.userData = null
      state.status = 'loading'
      state.isAuth = false
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload
    },
    setUpdateError: (state, action) => {
      state.updateError = action.payload
    },

    setSelectedNavItem: (state, action) => {
      state.selectedNavItem = action.payload
    },
  },
})

export const { setLoginError, setRegisterError, setSelectedNavItem, setUpdateError, logout } = authSlice.actions

export default authSlice.reducer