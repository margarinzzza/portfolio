import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  categoryNameValue: '',
  brandNameValue: '',
  addCategoryErrors: '',
  addBrandErrors: '',
  categoriesLoading: 'loading',
  brandLoading: 'loading',
  categoriesData: [],
  brandsData: [],
}

export const getCategories = createAsyncThunk('/getCategories', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/get_types', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const createCategory = createAsyncThunk('/createCategory', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/create_type', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deleteCategory = createAsyncThunk('/deleteCategory', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete('/delete_type', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getBrands = createAsyncThunk('/getBrands', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/get_brands', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const createBrand = createAsyncThunk('/createBrand', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/create_brand', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deleteBrand = createAsyncThunk('/deleteBrand', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete('/delete_brand', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBrandNameValue: (state, action) => {
      state.brandNameValue = action.payload
    },

    setCategoryNameValue: (state, action) => {
      state.categoryNameValue = action.payload
    },

    addCategoryErrors: (state, action) => {
      state.addCategoryErrors = action.payload
    },
    addBrandErrors: (state, action) => {
      state.addBrandErrors = action.payload
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.categoriesLoading = 'loading'
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categoriesData = action.payload.typesData
      state.categoriesLoading = 'loaded'
    },
    [getCategories.rejected]: (state, action) => {
      //state.loginError = action.payload.message
    },

    [createCategory.pending]: (state) => {
      state.categoriesLoading = 'loading'
    },
    [createCategory.fulfilled]: (state, action) => {
      state.categoryNameValue = ''
      state.addCategoryErrors = 'Type added'
      state.categoriesLoading = 'loaded'
    },
    [createCategory.rejected]: (state, action) => {
      state.addCategoryErrors = action.payload.msg
    },

    [getBrands.pending]: (state) => {
      state.brandLoading = 'loading'
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brandsData = action.payload.brandsData
      state.brandLoading = 'loaded'
    },
    [getBrands.rejected]: (state, action) => {
      //state.loginError = action.payload.message
    },

    [createBrand.pending]: (state) => {
      state.brandLoading = 'loading'
    },
    [createBrand.fulfilled]: (state, action) => {
      state.brandNameValue = ''
      state.addBrandErrors = 'Brand added'
      state.brandLoading = 'loaded'
    },
    [createBrand.rejected]: (state, action) => {
      state.addBrandErrors = action.payload.msg
    },

  }
})

export const filtersActions = filtersSlice.actions

export default filtersSlice.reducer