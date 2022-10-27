import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  status: 'loading',
  users: null,
  search: {
    searchQuery: '',
    searchData: null
  }
}

export const getUsers = createAsyncThunk('auth/getUsers', async () => {
  const { data } = await axios.get('/getUsers')
  return data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.search.searchQuery = action.payload
    },

    searchUser: (state) => {
      if(state.search.searchQuery!==''){
        const filteredArray = state.users.filter(el=>el.name.toLowerCase().includes(state.search.searchQuery.toLowerCase()))
        state.search.searchData = filteredArray
      }
    },
  },

  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users
      state.status = 'loaded'
    },
    [getUsers.rejected]: (state, action) => {
      state.users = null
      state.status = 'err'
    },
  },
})

export const {setSearchQuery, searchUser} = usersSlice.actions

export default usersSlice.reducer