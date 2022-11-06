import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  cartMessage: '',
  cartLoading: 'loading',
  cartData: [],
  ordersData: []
}

export const addToCart = createAsyncThunk('/addToCart', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/add_to_cart', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const makeOrder = createAsyncThunk('/makeOrder', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/make_order', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getOrders = createAsyncThunk('/getOrders', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/get_orders', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getAllOrders = createAsyncThunk('/getAllOrders', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/get_all_orders', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deleteFromCart = createAsyncThunk('/deleteFromCart', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/delete_from_cart', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getCart = createAsyncThunk('/getCart', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/get_cart', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const changeOrderStatus = createAsyncThunk('/changeOrderStatus', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/change_order_status', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setDeviceNameValue: (state, action) => {
      state.deviceNameValue = action.payload
    },
  },

  extraReducers: {
    [addToCart.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [addToCart.fulfilled]: (state, action) => {
      const { newDevice, actionType } = action.payload
      if (actionType === 'increment') {
        const candidate = state.cartData.find(el => el.basketDeviceId == newDevice.id)
        candidate.count += 1
      } else if (actionType === 'add') {
        state.cartData = state.cartData.push(newDevice)
      }
      state.cartLoading = 'loaded'
    },
    [addToCart.rejected]: (state, action) => {
      state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [deleteFromCart.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [deleteFromCart.fulfilled]: (state, action) => {
      const { newDevice, actionType } = action.payload
      const candidate = state.cartData.find(el => el.basketDeviceId == newDevice.id)
      if (actionType === 'decrement') {
        candidate.count -= 1
      } else if (actionType === 'destroy') {
        state.cartData = state.cartData.filter(el=>el.basketDeviceId !== candidate.basketDeviceId)
      }
      state.cartLoading = 'loaded'
    },
    [deleteFromCart.rejected]: (state, action) => {
      state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [getCart.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [getCart.fulfilled]: (state, action) => {
      state.cartData = action.payload.cartDataFinal
      //state.cartMessage = 'device added to cart'
      state.cartLoading = 'loaded'
    },
    [getCart.rejected]: (state, action) => {
      state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [makeOrder.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [makeOrder.fulfilled]: (state, action) => {
      state.cartData = []
      //state.cartMessage = 'device added to cart'
      state.cartLoading = 'loaded'
    },
    [makeOrder.rejected]: (state, action) => {
      //state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [getOrders.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [getOrders.fulfilled]: (state, action) => {
      state.ordersData = action.payload.orderDeviceDataFinal
      //state.cartMessage = 'device added to cart'
      state.cartLoading = 'loaded'
    },
    [getOrders.rejected]: (state, action) => {
      //state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [getAllOrders.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.ordersData = action.payload.orderDeviceDataFinal
      //state.cartMessage = 'device added to cart'
      state.cartLoading = 'loaded'
    },
    [getAllOrders.rejected]: (state, action) => {
      //state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

    [changeOrderStatus.pending]: (state) => {
      state.cartLoading = 'loading'
    },
    [changeOrderStatus.fulfilled]: (state, action) => {
      const { order } = action.payload
      const updatedOrder = state.ordersData.find(el => el.order.id == order.id)
      updatedOrder.order.status = order.status
      state.cartLoading = 'loaded'
    },
    [changeOrderStatus.rejected]: (state, action) => {
      //state.addDeviceErrors = action.payload.msg
      state.cartLoading = 'loading'
    },

  }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer