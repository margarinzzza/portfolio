import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";

const initialState = {
  data: null,
  status: 'loading',
  authErr: ''
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/register', params);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const checkEmailUnique = createAsyncThunk('auth/checkEmailUnique', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/checkEmailUnique', params);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/login', params);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchRedactProfile = createAsyncThunk('auth/fetchRedactProfile', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/redact_profile', params);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
    clearAuthErr: (state) => {
      state.authErr = ''
    },
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
        state.authErr = ''
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        const newObj: any = action.payload
        state.authErr = newObj.msg
      })

      .addCase(checkEmailUnique.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkEmailUnique.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.authErr = ''
      })
      .addCase(checkEmailUnique.rejected, (state, action) => {
        state.status = 'error';
        const newObj: any = action.payload
        state.authErr = newObj.msg
      })

      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        state.authErr = ''
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        const newObj: any = action.payload
        state.authErr = newObj.msg
      })

      .addCase(fetchRedactProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRedactProfile.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        state.authErr = ''
      })
      .addCase(fetchRedactProfile.rejected, (state, action) => {
        const newObj: any = action.payload
        state.authErr = newObj.msg
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
export const { logout, clearAuthErr } = authSlice.actions