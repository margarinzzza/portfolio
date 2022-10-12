import { createSlice } from '@reduxjs/toolkit'
import { collections, photoCategories } from '../../store/store'

const initialState = {
  collectionsState: collections,
  photoCategories,
  searchRequest: '',
  selectedCategory: 0,
  currentPage: 1,
  itemsPerPage: 6,
}

export const photoCollectionsSlice = createSlice({
  name: 'photoCollections',
  initialState,
  reducers: {

    setCollectionsState: (state, action) => {
      state.collectionsState = action.payload
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },

    setSearchRequest: (state, action) => {
      state.searchRequest = action.payload
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    filterCollections: (state, action) => {
      if (state.selectedCategory !== 0) {
        const filteredCollection = collections.filter((el) => {
          return el.collectionName.toLowerCase().includes(state.searchRequest) && el.categoryId === state.selectedCategory
        })
        state.collectionsState = filteredCollection
      } else {
        const filteredCollection = collections.filter((el) => {
          return el.collectionName.toLowerCase().includes(state.searchRequest)
        })
        state.collectionsState = filteredCollection
      }
      state.currentPage = 1
    },
  },
})

export const {
  filterCollections, setSearchRequest, setSelectedCategory, setCurrentPage, 
  setCollectionsState,
} = photoCollectionsSlice.actions

export default photoCollectionsSlice.reducer