import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: any) => {
  try {
    const { data } = await axios.post('/register', params);
    return data;
  } catch (err: any) {
    console.log('fetchRegister not work', err)
  }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: any) => {
  try {
    const { data } = await axios.post('/login', params);
    return data;
  } catch (err) {
    console.log('fetchLogin not work')
  }
})

export const fetchRedactProfile = createAsyncThunk('auth/fetchRedactProfile', async (params: any) => {
  try {
    const { data } = await axios.post('/redact_profile', params);
    return data;
  } catch (err) {
    console.log('fetchRedactProfile not work')
  }
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  try {
    const { data } = await axios.get('/profile');
    return data;
  } catch (err) {
    console.log('not auth')
  }
})

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state)=>{
      state.data =null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })

      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })

      .addCase(fetchRedactProfile.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRedactProfile.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRedactProfile.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
  },
})

export const selectIsAuth = (state: any) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: {
//     [fetchAuth.pending]: (state: { status, data }) => {
//       state.status = 'loading';
//       state.data = null;
//     },
//     [fetchAuth.fulfilled]: (state: { status, data }, action: { payload }) => {
//       state.status = 'loaded';
//       state.data = action.payload;
//     },
//     [fetchAuth.rejected]: (state: { status, data }) => {
//       state.status = 'loading';
//       state.data = null;
//     }
//   }
// })