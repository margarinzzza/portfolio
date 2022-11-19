import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: true,
    userData: {
        name: 'Alex'
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: () => {

        },
        login: () => {

        },
        checkAuth: () => {

        }
    }
})

export const authReducerAction = authSlice.actions

export default authSlice.reducer