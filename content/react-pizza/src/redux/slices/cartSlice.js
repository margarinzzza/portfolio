import { createSlice } from '@reduxjs/toolkit'
import { } from '../../store/store'

const initialState = {
  cart: [],
  countCartitems: 0,
  cartPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {

      let itemId = action.payload.itemId
      let itemSize = action.payload.size
      let itemDought = action.payload.doughtType
      let price = action.payload.price
      if (state.cart.length == 0) {
        state.cart.push(action.payload)
      } else {
        let isMatches = false
        state.cart.forEach((el, idx) => {
          if (el.itemId === itemId && el.size === itemSize && el.doughtType === itemDought) {
            isMatches = true
            el.count += 1
            return el.price += price
          }
        })
        if (isMatches === false) {
          state.cart.push(action.payload)
        }
      }
    },

    deleteItemsFromCart: (state, action) => {
      let itemId = action.payload
      const filteredArray = state.cart.filter(el => {
        return el.itemId !== itemId
      })
      state.cart = filteredArray
    },

    decrementOneItemFromCart: (state, action) => {
      console.log(action.payload)
      state.cart.forEach(el => {
        if (el.id === action.payload) {
          if (el.count > 1) {
            el.price -= el.price / el.count
            return el.count -= 1
          } else {
            return state.cart = state.cart.filter((el) => {
              return el.id !== action.payload
            })
          }
        }
      })
    },

    deleteOneItemFromCart: (state, action) => {
      state.cart = state.cart.filter((el) => {
        return el.id !== action.payload
      })
    },

    clearCart: (state) => {
      state.cart = []
    },

    setCountCartitems: (state, action) => {
      if (state.cart.length > 0) {
        let value = state.cart.reduce((sum, current) => sum + current.count, 0)
        state.countCartitems = value
      } else {
        state.countCartitems = 0
      }
    },
    setCartPrice: (state, action) => {
      if (state.cart.length > 0) {
        let value = state.cart.reduce((sum, current) => sum + current.price, 0)
        state.cartPrice = value
      } else {
        state.cartPrice = 0
      }
    },
  },
})

export const { addItemToCart, deleteItemsFromCart, setCountCartitems, clearCart, setCartPrice, decrementOneItemFromCart, deleteOneItemFromCart } = cartSlice.actions

export default cartSlice.reducer