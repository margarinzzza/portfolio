import { createSlice } from '@reduxjs/toolkit'
import { pizzas, sortList, categoryList } from '../../store/store'

const initialState = {
  pizzasList: pizzas,
  selectedCategory: categoryList[0],
  selectedSort: sortList[0],
  searchQuery: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSort: (state, action) => {
      state.selectedSort = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    filterPizzas: (state) => {
      const filterBySort = [...pizzas].sort((a, b) => {
        if (a[state.selectedSort.value] < b[state.selectedSort.value])
          return -1;
        if (a[state.selectedSort.value] > b[state.selectedSort.value])
          return 1;
        return 0;
      })

      if (state.searchQuery == '' && state.selectedCategory.id == 0) {
        state.pizzasList = filterBySort
      } else if (state.searchQuery !== '' && state.selectedCategory.id == 0) {
        const filterBySearch = filterBySort.filter((el) => {
          return el.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        })
        state.pizzasList = filterBySearch
      } else if (state.searchQuery == '' && state.selectedCategory.id !== 0) {
        console.log('фильтрация по сортировке и категории')
        const filterByCategory = filterBySort.filter((el) => {
          return el.categoryId == state.selectedCategory.id
        })
        state.pizzasList = filterByCategory
      } else {
        console.log('фильтрация по сортировке, запросу и категории')
        const filterByCategory = filterBySort.filter((el) => {
          return el.categoryId == state.selectedCategory.id
        })
        const filterBySearch = filterByCategory.filter((el) => {
          return el.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        })
        state.pizzasList = filterBySearch
      }

    },
  },
})

export const { setCategory, setSort, setSearchQuery, filterPizzas } = filterSlice.actions

export default filterSlice.reducer