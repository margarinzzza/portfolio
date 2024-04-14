import { createSlice, current } from '@reduxjs/toolkit'

const cartItemInterface = {
    productId: null,
    count: null
}

const initialState = {
    cart: [],
    cartLoading: false
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productId = action.payload
            const currentCart = current(state.cart)
            const productIdx = currentCart.findIndex(i => i.productId === productId)
            if (productIdx !== -1) state.cart[productIdx].count += 1
            if (productIdx === -1) state.cart.push({ productId, count: 1 })
        },
        decrementProduct: (state, action) => {
            const productId = action.payload
            const currentCart = current(state.cart)
            const productIdx = currentCart.findIndex(i => i.productId === productId)
            if (currentCart[productIdx].count > 1) state.cart[productIdx].count -= 1
            if (currentCart[productIdx].count == 1) state.cart = state.cart.filter(el => el.productId !== productId)
        },
        deleteProduct: (state, action) => {
            const productId = action.payload
            state.cart = state.cart.filter(el => el.productId !== productId)
        },
    }
})

export const cartSliceActions = cartSlice.actions
export default cartSlice.reducer