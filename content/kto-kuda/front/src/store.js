import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import eventsSlice from './features/eventsSlice'

export const store = configureStore({
    reducer: {
        authSlice, eventsSlice
    }
})