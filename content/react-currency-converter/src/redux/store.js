import { configureStore } from "@reduxjs/toolkit"
import currenciesReducer from './slices/currenciesSlice'

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  }
})

