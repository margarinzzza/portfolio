import { configureStore } from "@reduxjs/toolkit"
import photoCollectionsReducer from './slices/photoCollectionsSlice'

export const store = configureStore({
  reducer: {
    photoCollections: photoCollectionsReducer,
  }
})

