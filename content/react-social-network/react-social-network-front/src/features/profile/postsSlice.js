import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  status: 'loading',
  allPosts: null,
  myPosts: null,
  searchQueryByName: '',
  searchData: null,
  searchQueryByText: '',
}

export const createPost = createAsyncThunk('auth/createPost', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/createPost', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getAllPosts = createAsyncThunk('auth/getAllPosts', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/getAllPosts')
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getMyPosts = createAsyncThunk('auth/getMyPosts', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/getMyPosts', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deletePost = createAsyncThunk('auth/deletePost', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/deletePost', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchQueryByName: (state, action) => {
      state.searchQueryByName = action.payload
    },

    setSearchQueryByText: (state, action) => {
      state.searchQueryByText = action.payload
    },

    searchPost: (state) => {
      let searchQueryByNameArray = []
      let searchQueryByTextArray = []
      let searchQueryByName = state.searchQueryByName.toLowerCase()
      let searchQueryByText = state.searchQueryByText.toLowerCase()
      if (searchQueryByName !== '' && searchQueryByText === '') {
        searchQueryByNameArray = state.allPosts.filter(el => el.name.toLowerCase().includes(searchQueryByName))
        state.searchData = searchQueryByNameArray
      } else if (searchQueryByName === '' && searchQueryByText !== '') {
        searchQueryByTextArray = state.allPosts.filter(el => el.text.toLowerCase().includes(searchQueryByText))
        state.searchData = searchQueryByTextArray
      } else if (searchQueryByName !== '' && searchQueryByText !== '') {
        searchQueryByNameArray = state.allPosts.filter(el => el.name.toLowerCase().includes(searchQueryByName))
        searchQueryByTextArray = searchQueryByNameArray.filter(el => el.text.toLowerCase().includes(searchQueryByText))
        state.searchData = searchQueryByTextArray
      } else {
        state.searchData = null
      }
    },

  },
  extraReducers: {
    [deletePost.pending]: (state) => {
      state.status = 'loading'
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = 'loaded'
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'err'
    },

    [getMyPosts.pending]: (state) => {
      state.status = 'loading'
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.myPosts = action.payload.posts
      state.status = 'loaded'
    },
    [getMyPosts.rejected]: (state, action) => {
      state.status = 'err'
    },

    [getAllPosts.pending]: (state) => {
      state.status = 'loading'
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts
      state.status = 'loaded'
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = 'err'
    },
  },
})

export const postsSliceActions = postsSlice.actions

export default postsSlice.reducer