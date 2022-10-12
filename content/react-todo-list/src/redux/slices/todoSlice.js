import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    inputText: '',
    selectedTodos: [],
    todos: [],
    searchQuery: '',
    filterQuery: '',
    searchResult: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setInputText: (state, action) => {
            state.inputText = action.payload
        },
        addTodo: (state) => {
            state.todos = [...state.todos,
            {
                id: Date.now(),
                name: state.inputText,
                completed: false
            }]
            state.inputText = ''
        },
        selectTodos: (state, action) => {
            if (state.selectedTodos.includes(action.payload)) {
                state.selectedTodos = state.selectedTodos.filter(el => el !== action.payload)
            } else {
                state.selectedTodos = [...state.selectedTodos, action.payload]
            }
        },

        selectAllTodos: (state) => {
            state.todos.forEach((item) => {
                state.selectedTodos = [...state.selectedTodos, item.id]
            })
        },

        selectAllSearchedTodos: (state) => {
            state.searchResult.forEach((item) => {
                state.selectedTodos = [...state.selectedTodos, item.id]
            })
        },

        markOneCompleted: (state, action) => {
            state.todos.forEach((todosItem, index) => {
                if (todosItem.id === action.payload) {
                    if (todosItem.completed) {
                        state.todos[index].completed = false
                    } else {
                        state.todos[index].completed = true
                    }
                }
            })
        },

        markSelectedTodosCompleted: (state) => {
            state.todos.forEach((todosItem, index) => {
                state.selectedTodos.forEach((selectedTodos) => {
                    if (todosItem.id === selectedTodos) {
                        state.todos[index].completed = true
                    }
                })
            })
            state.selectedTodos = []
        },

        setFitlter: (state, action) => {
            state.filterQuery = action.payload
        },

        filterTodos: (state) => {
            if (state.filterQuery === 'completed') {
                const filteredTodos = state.todos.filter((el) => {
                    return el.completed
                })
                state.searchResult = filteredTodos
            } else if(state.filterQuery === 'uncompleted') {
                const filteredTodos = state.todos.filter((el) => {
                    return !el.completed
                })
                state.searchResult = filteredTodos
            } else if(!state.filterQuery && !state.searchQuery) {
                state.searchResult = []
            }
        },

        markSelectedTodosUncompleted: (state) => {
            state.todos.forEach((todosItem, index) => {
                state.selectedTodos.forEach((selectedTodos) => {
                    if (todosItem.id === selectedTodos) {
                        state.todos[index].completed = false
                    }
                })
            })
            state.selectedTodos = []
        },

        clearSelectedTodos: (state) => {
            state.selectedTodos = []
        },
        deleteTodos: (state) => {
            state.todos = state.todos.filter(el => !state.selectedTodos.includes(el.id))
            state.selectedTodos = []
        },

        deleteOneTodo: (state, action) => {
            state.todos = state.todos.filter(el => el.id !== action.payload)
        },

        searchTodoItem: (state, action) => {
            state.searchQuery = action.payload
            if (state.searchQuery.trim().length !== 0) {
                const filteredTodos = state.todos.filter((el) => {
                    return el.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                })
                state.searchResult = filteredTodos
            } else {
                state.searchResult = []
            }
        }
    }
})

export const { addTodo, deleteTodos, deleteOneTodo, setInputText, selectTodos, clearSelectedTodos, markOneCompleted, selectAllTodos, markSelectedTodosCompleted, markSelectedTodosUncompleted, searchTodoItem, selectAllSearchedTodos, filterTodos, setFitlter } = todoSlice.actions

export default todoSlice.reducer