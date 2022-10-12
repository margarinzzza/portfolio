import { configureStore } from "@reduxjs/toolkit"
import themeReducer from './slices/themeSlice'
import cityReducer from './slices/citiesSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    city: cityReducer,
    
  }
})

