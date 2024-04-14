import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    sidePopUp: {
        isOpened: false,
        children: ''
    }
}

export const visibleStates = createSlice({
    name: 'visibleStates',
    initialState,
    reducers: {
        showSidePopup: (state, action) => {
            state.sidePopUp.isOpened = true
            state.sidePopUp.children = action.payload.children
        },
        hideSidePopup: (state) => {
            state.sidePopUp.isOpened = false
            state.sidePopUp.children = ''
        },
    }
})

export const visibleStatesActions = visibleStates.actions
export default visibleStates.reducer