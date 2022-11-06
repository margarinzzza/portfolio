import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
  nameSearchQuery: '',
  typeSearchQuery: null,
  brandSearchQuery: null,

  deviceNameValue: '',
  devicePriceValue: 0,
  deviceTypeValue: null,
  deviceDecriptionValue: [],
  deviceBrandValue: null,

  addDeviceErrors: '',
  devicesLoading: 'loading',
  devicesData: [],
  deviceData: null,
  deviceInfoData: []
}

export const getDevices = createAsyncThunk('/getDevices', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/get_devices`, params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getDeviceinfo = createAsyncThunk('/getDeviceinfo', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/get_devices`, params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getDevice = createAsyncThunk('/getDevice', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/get_device', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const createDevice = createAsyncThunk('/createDevice', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/create_device', params)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceNameValue: (state, action) => {
      state.deviceNameValue = action.payload
    },
    setDevicePriceValue: (state, action) => {
      state.devicePriceValue = action.payload
    },
    setDeviceTypeValue: (state, action) => {
      state.deviceTypeValue = action.payload
    },
    setDeviceBrandValue: (state, action) => {
      state.deviceBrandValue = action.payload
    },

    setDeviceDecriptionValue: (state, action) => {
      state.deviceDecriptionValue.push(action.payload)
    },

    fillDecriptionProperty: (state, action) => {
      let id = action.payload.id
      let value = action.payload.value
      let selectedDesc = state.deviceDecriptionValue.find(el=>el.id==id)
      selectedDesc.property = value
    },

    fillDecriptionValue: (state, action) => {
      let id = action.payload.id
      let value = action.payload.value
      let selectedDesc = state.deviceDecriptionValue.find(el=>el.id==id)
      selectedDesc.value = value
    },

    deleteDeviceDecriptionValue: (state, action) => {
      let id = action.payload
      state.deviceDecriptionValue= state.deviceDecriptionValue.filter(el=>el.id!==id)
    },

    setNameSearchQuery: (state, action) => {
      state.nameSearchQuery = action.payload
    },

    setTypeSearchQuery: (state, action) => {
      if (state.typeSearchQuery?.id === action.payload?.id) {
        state.typeSearchQuery = null
      } else {
        state.typeSearchQuery = action.payload
      }
    },

    setBrandSearchQuery: (state, action) => {
      if (state.brandSearchQuery?.id === action.payload.id) {
        state.brandSearchQuery = null
      } else {
        state.brandSearchQuery = action.payload
      }
    },

    setAddDeviceErrors: (state, action) => {
      state.addDeviceErrors = action.payload
    },
  },

  extraReducers: {
    [getDevices.pending]: (state) => {
      state.devicesLoading = 'loading'
    },
    [getDevices.fulfilled]: (state, action) => {
      state.devicesData = action.payload.filteredArray
      state.devicesLoading = 'loaded'
    },
    [getDevices.rejected]: (state, action) => {
      //state.loginError = action.payload.message
    },

    [getDevice.pending]: (state) => {
      state.deviceLoading = 'loading'
    },
    [getDevice.fulfilled]: (state, action) => {
      state.deviceInfoData = action.payload.deviceInfoData
      state.deviceData = action.payload.deviceData
      state.deviceLoading = 'loaded'
    },
    [getDevice.rejected]: (state, action) => {
      //state.loginError = action.payload.message
    },

    [createDevice.pending]: (state) => {
      //state.deviceLoading = 'loading'
    },
    [createDevice.fulfilled]: (state, action) => {
      state.deviceNameValue = ''
      state.devicePriceValue = 0
      state.deviceTypeValue = null
      state.deviceBrandValue = null
      state.deviceDecriptionValue = []
      state.addDeviceErrors = 'Device created'
      //state.deviceLoading = 'loaded'
    },
    [createDevice.rejected]: (state, action) => {
      state.addDeviceErrors = action.payload.msg
    },
  }
})

export const deviceActions = deviceSlice.actions

export default deviceSlice.reducer