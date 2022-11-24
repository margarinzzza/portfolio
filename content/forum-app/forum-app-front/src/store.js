import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './features/adminSlice'
import authSlice from './features/authSlice'
import boardSlice from './features/boardSlice'
import postSlice from './features/postSlice'
import threadSlice from './features/threadSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    board: boardSlice,
    thread: threadSlice,
    post: postSlice,
    admin: adminSlice
  }
})