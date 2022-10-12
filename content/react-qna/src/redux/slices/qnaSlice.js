import { createSlice } from '@reduxjs/toolkit'
import { qnas } from '../../store/store'

const initialState = {
  qna: qnas[0],
  progressBar: 0,
  rightQuestions: 0,
  qnasLengthStep: (100 / qnas.length).toFixed(1)
}

export const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      if (qnas[action.payload]) {
        state.qna = qnas[action.payload]
      } else {
        state.qna = 'end'
      }
    },
    setProgressBar: (state) => {
      state.progressBar = parseInt(state.progressBar) + parseInt(state.qnasLengthStep)
    },
    setRightQuestions: (state) => {
      state.rightQuestions = state.rightQuestions + 1
    },
    resetQuestions: (state) => {
      state.qna = qnas[0]
      state.progressBar = 0
      state.rightQuestions = 0
    },
  },
})

export const { setQuestion, setProgressBar, setRightQuestions, resetQuestions } = qnaSlice.actions

export default qnaSlice.reducer