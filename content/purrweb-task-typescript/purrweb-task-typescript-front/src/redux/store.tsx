import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../Auth"

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
}) 

export const questionsState = [
    {
        id: 1,
        question: 'Подписываете ли вы соглашение о неразглашении?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dicta voluptate quos consequuntur ducimus iure commodi numquam quaerat sed. Doloremque, ipsa ducimus!'
    },

    {
        id: 2,
        question: 'Сколько займет создание MVP?',
        answer: 'Nihil dicta voluptate quos consequuntur ducimus iure commodi numquam quaerat sed. Doloremque, ipsa ducimus! Provident quae iste reprehenderit sapiente aspernatur.'
    },

    {
        id: 3,
        question: 'Предоставляете ли вы маркетинговые услуги?',
        answer: 'Dicta voluptate quos consequuntur ducimus iure commodi numquam quaerat sed. Doloremque, ipsa.'
    },

    {
        id: 4,
        question: 'Различается ли MVP от прототипов?',
        answer: 'Provident quae iste reprehenderit sapiente aspernatur, nam commodi?'
    },
]