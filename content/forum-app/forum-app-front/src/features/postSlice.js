import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios.js'

const initialState = {
    posts: [],
    postsNum: 0,
    postsLoadingStatus: 'loading',
    createPostErrors: '',
    text: ''
}

export const createPost = createAsyncThunk('/createPost', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/createPost`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getPosts = createAsyncThunk('/getPosts', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/getPosts`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getPostsNum = createAsyncThunk('/getPostsNum', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/getPostsNum`, params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const deletePost = createAsyncThunk('/deletePost', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/deletePost`, {data: params})
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        },
    },
    extraReducers: {
        [createPost.pending]: (state) => {
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload.postData)
            state.text = ''
            state.createPostErrors = ''
        },
        [createPost.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.createPostErrors = action.payload.msg
        },

        [getPosts.pending]: (state) => {
            state.postsLoadingStatus = 'loading'
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.postsData
            state.postsLoadingStatus = 'loaded'
        },
        [getPosts.rejected]: (state, action) => {
            console.log(action.payload.msg)
            state.createPostErrors = action.payload.msg
            state.postsLoadingStatus = 'err'
        },

        [getPostsNum.pending]: (state) => {
        },
        [getPostsNum.fulfilled]: (state, action) => {
            state.postsNum = action.payload.postsNum
        },
        [getPostsNum.rejected]: (state, action) => {
            console.log(action.payload.msg)
        },

    }
})

export const postReducerAction = postSlice.actions

export default postSlice.reducer