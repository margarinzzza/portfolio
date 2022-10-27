import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  status: 'loading',
  allChats: [],
  myChats: [],
  messages: [],
  selectedChat: []
}

export const createChat = createAsyncThunk('auth/createChat', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/createChat', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getAllChats = createAsyncThunk('auth/getAllChats', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/getAllChats', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getMyChats = createAsyncThunk('auth/getMyChats', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/getMyChats', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const sendMessage = createAsyncThunk('auth/sendMessage', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/sendMessage', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getMessages = createAsyncThunk('auth/getMessages', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/getMessages', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    selectDialog: (state, action) => {
      let selectedChat = state.myChats.find(el=>el._id===action.payload)
      //console.log(current(selectedChat))
      if (selectedChat) {
        state.selectedChat = selectedChat
      } else state.selectedChat = null
    },
    resetSelectDialog: (state, action) => {
      state.selectedDialog = []
    },
  },
  extraReducers: {
    [createChat.pending]: (state) => {
      state.status = 'loading'
    },
    [createChat.fulfilled]: (state, action) => {
      state.myChats.push(action.payload.chat)
      state.status = 'loaded'
    },
    [createChat.rejected]: (state, action) => {
      console.log(action)
      state.status = 'err'
    },

    // [getAllChats.pending]: (state) => {
    //   state.status = 'loading'
    // },
    // [getAllChats.fulfilled]: (state, action) => {
    //   state.allChats = action.payload.chats
    //   state.status = 'loaded'
    // },
    // [getAllChats.rejected]: (state, action) => {
    //   console.log(action)
    //   state.status = 'err'
    // },

    [getMyChats.pending]: (state) => {
      state.status = 'loading'
    },
    [getMyChats.fulfilled]: (state, action) => {
      state.myChats = action.payload.chats
      state.status = 'loaded'
    },
    [getMyChats.rejected]: (state, action) => {
      console.log(action)
      state.status = 'err'
    },

    [sendMessage.pending]: (state) => {
      state.status = 'loading'
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.messages.push(action.payload.message)
      state.status = 'loaded'
    },
    [sendMessage.rejected]: (state, action) => {
      console.log(action)
      state.status = 'err'
    },

    [getMessages.pending]: (state) => {
      state.status = 'loading'
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.messages
      state.status = 'loaded'
    },
    [getMessages.rejected]: (state, action) => {
      console.log(action)
      state.status = 'err'
    },
  }
})

export const { selectDialog, resetSelectDialog } = dialogsSlice.actions

export default dialogsSlice.reducer