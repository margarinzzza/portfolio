import { configureStore } from "@reduxjs/toolkit"
import qnaReducer from './slices/qnaSlice'

export const store = configureStore({
  reducer: {
    qna: qnaReducer,
  }
})

