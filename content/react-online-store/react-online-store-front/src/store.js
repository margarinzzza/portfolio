import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import deviceSlice from './features/auth/deviceSlice'
import filtersSlice from './features/auth/filtersSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    filters: filtersSlice,
    device: deviceSlice
  },
})