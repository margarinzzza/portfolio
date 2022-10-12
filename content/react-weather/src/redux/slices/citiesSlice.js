import { createSlice } from '@reduxjs/toolkit'
import { cities } from '../../store/store'

const initialState = {
  city: cities[0]
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload
    },

  },
})

export const { setCity } = citySlice.actions

export default citySlice.reducer