import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    registerData: [],
    loginData: [],
    authStatus: 'loading',
    isAuth: false,
    userData: null,
    authError: '',
    usersData: {
        usersDataArr: [],
        usersDataTape: 1,
        arrLength: null
    },
    friendsData: {
        friendsDataArr: [],
        friendsDataTape: 1,
        arrLength: null
    },
    offers: {
        sendedOffers: [],
        gettedOffers: []
    }
}

export const registerUser = createAsyncThunk('register', async (params, { rejectWithValue }) => {
    return await axios.post(`/register`, params).then(response => {
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const updateUser = createAsyncThunk('updateUser', async (params, { rejectWithValue }) => {
    return await axios.post(`/updateUser`, params).then(response => {
        window.localStorage.removeItem('token')
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const login = createAsyncThunk('login', async (params, { rejectWithValue }) => {
    return await axios.post(`/login`, params).then(response => {
        window.localStorage.setItem('token', response.data.token)
        return response.data
    }).catch(e => rejectWithValue(e.response.data))
})

export const deleteUser = createAsyncThunk('deleteUser', async (params, { rejectWithValue }) => {
    return await axios.post(`/deleteUser`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const refreshMe = createAsyncThunk('refreshMe', async () => {
    return await axios.get(`/refreshMe`).then(response => response.data).catch(e => { throw e })
})

export const getUsers = createAsyncThunk('getUsers', async (params, { rejectWithValue }) => {
    if (params.findUsersQuery === '') params.findUsersQuery = 'ALL'
    return await axios.post(`/getUsers`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const getMyFriends = createAsyncThunk('getMyFriends', async (params, { rejectWithValue }) => {
    if (params.findMyFriendsQuery === '') params.findMyFriendsQuery = 'ALL'
    return await axios.post(`/getMyFriends`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const getMyOffersData = createAsyncThunk('getMyOffersData', async (userId, { rejectWithValue }) => {
    return await axios.get(`/getMyOffersData/${userId}`).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const offerFriendship = createAsyncThunk('offerFriendship', async (params, { rejectWithValue }) => {
    return await axios.post(`/offerFriendship`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const cancelOfferFriendship = createAsyncThunk('cancelOfferFriendship', async (params, { rejectWithValue }) => {
    return await axios.post(`/cancelOfferFriendship`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const acceptOfferFriendship = createAsyncThunk('acceptOfferFriendship', async (params, { rejectWithValue }) => {
    return await axios.post(`/acceptOfferFriendship`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const deleteFriend = createAsyncThunk('deleteFriend', async (params, { rejectWithValue }) => {
    return await axios.post(`/deleteFriend`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.authStatus = 'loaded'
            })

            .addCase(updateUser.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.authStatus = 'loaded'
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.authStatus = 'loaded'
            })

            .addCase(deleteUser.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.authError = ''
                window.localStorage.removeItem('token')
                state.userData = null
                state.isAuth = false
                state.authStatus = 'loaded'
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.authStatus = 'loaded'
            })

            .addCase(login.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authError = ''
                state.userData = action.payload.data
                state.isAuth = true
                state.authStatus = 'loaded'
            })
            .addCase(login.rejected, (state, action) => {
                state.authError = action.payload.msg
                state.authStatus = 'loaded'
            })

            .addCase(refreshMe.pending, (state) => {
                state.authStatus = 'loading'
            })
            .addCase(refreshMe.fulfilled, (state, action) => {
                if (action.payload === null) {
                    state.userData = null
                    state.isAuth = false
                } else {
                    state.userData = action.payload
                    state.isAuth = true
                }
                state.authStatus = 'loaded'
            })
            .addCase(refreshMe.rejected, (state, action) => {
                state.userData = null
                state.isAuth = false
                state.authStatus = 'loaded'
            })

            .addCase(getUsers.pending, () => { })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.usersData.usersDataArr = action.payload.userData
                state.usersData.arrLength = action.payload.arrLength
            })
            .addCase(getUsers.rejected, () => { })

            .addCase(getMyFriends.pending, () => { })
            .addCase(getMyFriends.fulfilled, (state, action) => {
                state.friendsData.friendsDataArr = action.payload.friendsData
                state.friendsData.arrLength = action.payload.arrLength
            })
            .addCase(getMyFriends.rejected, () => { })

            .addCase(offerFriendship.pending, () => { })
            .addCase(offerFriendship.fulfilled, (state, action) => {
                state.userData.myFriendOffers = action.payload.updatedData
            })
            .addCase(offerFriendship.rejected, () => { })

            .addCase(cancelOfferFriendship.pending, () => { })
            .addCase(cancelOfferFriendship.fulfilled, (state, action) => {
                state.userData.myFriendOffers = action.payload.updatedData.myFriendOffers
            })
            .addCase(cancelOfferFriendship.rejected, () => { })

            .addCase(acceptOfferFriendship.pending, () => { })
            .addCase(acceptOfferFriendship.fulfilled, (state, action) => {
                state.userData.friends = action.payload.friends
                state.userData.friendOffers = action.payload.friendOffers
            })
            .addCase(acceptOfferFriendship.rejected, () => { })

            .addCase(getMyOffersData.pending, () => { })
            .addCase(getMyOffersData.fulfilled, (state, action) => {
                state.offers.sendedOffers = action.payload.sendedOffers
                state.offers.gettedOffers = action.payload.gettedOffers
            })
            .addCase(getMyOffersData.rejected, () => { })

            .addCase(deleteFriend.pending, () => { })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.userData.friends = action.payload.updatedData
            })
            .addCase(deleteFriend.rejected, () => { })

    },
    reducers: {
        logout: (state) => {
            window.localStorage.removeItem('token')
            state.userData = null
            state.isAuth = false
        },
        setAuthError: (state, action) => {
            state.authError = action.payload
        },
        setRegisterData: (state, action) => {
            const { value, name } = action.payload
            const newData = { ...current(state.registerData), [name]: value }
            state.registerData = newData
        },
        setLoginData: (state, action) => {
            const { value, name } = action.payload
            const newData = { ...current(state.loginData), [name]: value }
            state.loginData = newData
        },
        incUsersDataTape: (state) => {
            state.usersData.usersDataTape += 1
        },
        incFriendsDataTape: (state) => {
            state.friendsData.friendsDataTape += 1
        },
        addChatId: (state, action) => {
            state.userData.chats.push(action.payload)
        }
    }
})

export const authSliceActions = authSlice.actions
export default authSlice.reducer