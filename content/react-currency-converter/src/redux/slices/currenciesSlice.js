import { createSlice } from '@reduxjs/toolkit'
import { currencies } from '../../store/store'

const initialState = {
  firstCurrensy: currencies[0],
  secondCurrensy: currencies[1],
  firstCurrensyValue: 0,
  secondCurrensyValue: 0,
}

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setFirstCurrensy: (state, action) => {
      state.firstCurrensy = currencies[action.payload]
    },
    setSecondCurrensy: (state, action) => {
      state.secondCurrensy = currencies[action.payload]
    },
    setFirstCurrensyValue: (state, action) => {
      state.firstCurrensyValue = action.payload
    },
    setSecondCurrensyValue: (state, action) => {
      state.secondCurrensyValue = action.payload
    },
  },
})

export const { setFirstCurrensy, setSecondCurrensy, setFirstCurrensyValue, setSecondCurrensyValue } = currenciesSlice.actions

export default currenciesSlice.reducer