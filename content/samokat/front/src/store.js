import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import visibleStates from './features/visibleStates'
import cartSlice from './features/cartSlice'

export const store = configureStore({
    reducer: {
        authSlice, visibleStates, cartSlice
    }
})

export const productArr = [
    { productId: 0, tags: ['profitable'], name: 'Name 1', imgSrc: [''], price: 500, measure: '0,5 л', text: 'Nobis, porro ipsum voluptas, consequatur dolores molestiae praesentium magnam minima doloremque, officiis expedita voluptatem mollitia est maxime. Repellat tempore neque repellendus dolor.' },
    { productId: 1, tags: ['profitable'], name: 'Name 2', imgSrc: [''], price: 200, measure: '1 шт', text: 'Nobis, porro ipsum voluptas, consequatur dolores molestiae praesentium magnam minima doloremque' },
    { productId: 2, tags: [''], name: 'Name 3', imgSrc: [''], price: 130, measure: '2 кг', text: 'Nobis, porro ipsum voluptas, consequatur dolores' }
]

export const storiesArr = [
    {
        storyId: 0, type: 'post', relatedProducts: [0, 1], title: 'title 1', imgSrc: [
            'https://cm.samokat.ru/processed/story_media/b888f54e-a5a9-4bdd-a24c-a91b08d1bcb2.jpg',
            'https://cm.samokat.ru/processed/story_media/ee4da52d-f463-41dd-b711-4bfde87a125d.jpg',
            'https://cm.samokat.ru/processed/story_media/94f18ef0-ef92-4612-bd88-9084cdffb8c1.jpg'
        ],
        text: 'Nobis, porro ipsum voluptas, consequatur dolores molestiae praesentium magnam minima doloremque, officiis expedita voluptatem mollitia est maxime. Repellat tempore neque repellendus dolor.'
    },
    {
        storyId: 1, type: 'post', relatedProducts: [0, 1, 2], title: 'title 2', imgSrc: [
            'https://cm.samokat.ru/processed/story_media/ee4da52d-f463-41dd-b711-4bfde87a125d.jpg',
            'https://cm.samokat.ru/processed/story_media/94f18ef0-ef92-4612-bd88-9084cdffb8c1.jpg'
        ],
        text: 'Nobis, porro ipsum voluptas'
    },
    { storyId: 2, type: 'story', relatedProducts: [], title: 'title 3', imgSrc: ['https://cm.samokat.ru/processed/story_media/94f18ef0-ef92-4612-bd88-9084cdffb8c1.jpg'], text: 'Nobis, porro ipsum voluptas, consequatur dolores molestiae praesentium magnam minima doloremque' },
]