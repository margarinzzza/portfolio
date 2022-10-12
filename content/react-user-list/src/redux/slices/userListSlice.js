import { createSlice } from '@reduxjs/toolkit'
import { tester } from '../../store/store'

const initialState = {
  
}

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      
    },
  },
})

export const { setQuestion } = userListSlice.actions

export default userListSlice.reducer