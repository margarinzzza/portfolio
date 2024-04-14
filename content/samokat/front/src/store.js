import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import visibleStates from './features/visibleStates'
import cartSlice from './features/cartSlice'

export const store = configureStore({
    reducer: {
        authSlice, visibleStates, cartSlice
    }
})

export const productArr = [{ productId: 0, name: 'Name 1', imgSrc: '', price: 500, measure: '0,5 л' },
{ productId: 1, name: 'Name 2', imgSrc: '', price: 200, measure: '1 шт' },
{ productId: 2, name: 'Name 3', imgSrc: '', price: 130, measure: '2 кг' },
{ productId: 3, name: 'Name 4', imgSrc: '', price: 330, measure: '2 шт' },
{ productId: 4, name: 'Name 5', imgSrc: '', price: 700, measure: '8 кг' },
{ productId: 5, name: 'Name 6', imgSrc: '', price: 100, measure: '6 шт' },
{ productId: 6, name: 'Name 7', imgSrc: '', price: 180, measure: '2 л' },
{ productId: 7, name: 'Name 8', imgSrc: '', price: 450, measure: '0,2 л' },
]