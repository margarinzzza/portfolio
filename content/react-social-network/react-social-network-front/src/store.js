import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/profile/authSlice'
import chatSlice from './features/profile/chatSlice'
import postsSlice from './features/profile/postsSlice'
import usersSlice from './features/profile/usersSlice'

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    chat: chatSlice,
    auth: authSlice,
    users: usersSlice
  },
})