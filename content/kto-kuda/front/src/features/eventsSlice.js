import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    userEventsData: [],
    userEventsDataTape: 1,
    eventsData: [],
    eventsDataPage: 1,
    eventData: {},
    eventsLoading: 'loading',
    eventLoading: 'loading',
    eventActionsError: '',
    createEventError: '',
}

export const createEvent = createAsyncThunk('createEvent', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/createEvent', params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const deleteEvent = createAsyncThunk('deleteEvent', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/deleteEvent', params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getEvents = createAsyncThunk('getEvents', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/getEvents', params)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const getUserProposals = createAsyncThunk('getUserProposals', async (params, { rejectWithValue }) => {
    return await axios.post(`/getUserProposals`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const getMyEvents = createAsyncThunk('getMyEvents', async (params, { rejectWithValue }) => {
    return await axios.get(`/getMyEvents/${params.userId}/${params.date}`).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const getEvent = createAsyncThunk('getEvent', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/getEvent/${params}`)
        return data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.eventsLoading = 'loading'
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.eventActionsError = ''
                state.eventsLoading = 'loaded'
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventsLoading = 'err'
            })

            .addCase(deleteEvent.pending, (state) => {
                state.eventsLoading = 'loading'
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.eventActionsError = ''
                state.eventsLoading = 'loaded'
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventsLoading = 'err'
            })

            .addCase(getEvents.pending, (state) => {
                state.eventsData = []
                state.eventsLoading = 'loading'
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.eventsData = action.payload.data
                state.eventActionsError = ''
                state.eventsLoading = 'loaded'
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventsLoading = 'err'
            })

            .addCase(getUserProposals.pending, (state) => {
                state.eventsData = []
                state.eventsLoading = 'loading'
            })
            .addCase(getUserProposals.fulfilled, (state, action) => {
                state.eventsData = action.payload.data
                state.eventActionsError = ''
                state.eventsLoading = 'loaded'
            })
            .addCase(getUserProposals.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventsLoading = 'err'
            })

            .addCase(getMyEvents.pending, (state) => {
                state.eventsData = []
                state.eventsLoading = 'loading'
            })
            .addCase(getMyEvents.fulfilled, (state, action) => {
                state.eventsData = action.payload.data
                state.eventActionsError = ''
                state.eventsLoading = 'loaded'
            })
            .addCase(getMyEvents.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventsLoading = 'err'
            })

            .addCase(getEvent.pending, (state) => {
                state.eventLoading = 'loading'
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.eventData = action.payload.data
                state.eventActionsError = ''
                state.eventLoading = 'loaded'
            })
            .addCase(getEvent.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventLoading = 'err'
            })



    },
    reducers: {
        setCreateEventError: (state, action) => {
            state.createEventError = action.payload
        },
        setEventsDataPage: (state, action) => {
            state.eventsDataPage = action.payload
        },
        setUserEventsDataTape: (state, action) => {
            state.userEventsDataTape = state.userEventsDataTape + 1
        },
    }
})

export const eventsSliceActions = eventsSlice.actions
export default eventsSlice.reducer