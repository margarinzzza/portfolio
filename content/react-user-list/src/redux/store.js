import { configureStore } from "@reduxjs/toolkit"
import userListReducer from './slices/userListSlice'

export const store = configureStore({
  reducer: {
    userList: userListReducer,
  }
})

