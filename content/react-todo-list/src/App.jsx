import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import TodoItemComponent from './components/TodoItemComponent';
import { addTodo, setInputText, clearSelectedTodos, deleteTodos, selectAllTodos, markSelectedTodosCompleted, markSelectedTodosUncompleted, searchTodoItem, filterTodos, setFitlter } from './redux/slices/todoSlice';

const App = () => {
  const dispatch = useDispatch()
  const { todos, inputText, selectedTodos, searchQuery, searchResult, filterQuery } = useSelector(state => state.todoSlice)

  const selectDeselectAll = () => {
    if (todos.length === selectedTodos.length) {
      dispatch(clearSelectedTodos())
    } else {
      dispatch(selectAllTodos())
    }
  }

  const checkTodosLenght = () => {
    if (todos.length == 0 && searchResult.length == 0) {
      return <span className='text-center text-slate-400 mt-4'>The list is empty</span> 
    }

    if (todos.length !== 0 && searchResult.length == 0 && searchQuery.trim().length == 0) {
      return todos.map((todo, index) => {
        return <TodoItemComponent key={todo.id} index={index} todo={todo} />
      })
    }

    if (todos.length !== 0 && searchResult.length !== 0) {
      return searchResult.map((todo, index) => {
        return <TodoItemComponent key={todo.id} index={index} todo={todo} />
      })
    }

    if (todos.length !== 0 && searchResult.length == 0 && searchQuery.trim().length !== 0 ) {
      return <span className='text-center text-slate-400 mt-4'>Nothing found</span> 
    }
  }

  useEffect(() => {
    dispatch(filterTodos())
  }, [todos])

  return (
    <div className="app">
      <div className='content mx-auto md:w-11/12 w-12/12'>
        <div className='todo-h text-center'>
          <h2>Todos</h2>
        </div>
        <div className='todo-form flex flex-wrap'>
          <div className='todo-form-input-item flex my-1'>
            <input value={inputText} placeholder='Add todo' type="text" onChange={(e) => dispatch(setInputText(e.target.value))} />
            <div onClick={() => dispatch(addTodo())} className={`add-form-button ${inputText.trim().length === 0 && 'disabled-button'}`}>Add</div>
          </div>
          <div className='todo-form-input-item my-1'>
            <input className='ml-2' type="search" placeholder='Find item' onChange={(e) => dispatch(searchTodoItem(e.target.value))} />
          </div>
        </div>

        <div className='todos-options md:p-0 pl-3 flex text-slate-600 cursor-pointer flex-wrap'>
          {searchQuery.trim().length !== 0 || todos.length > 1 &&
            <>
              <span onClick={() => selectDeselectAll()} className='pr-2'>{todos.length === selectedTodos.length ? 'Deselect all' : 'Select all'}</span>
              <span onClick={() => { dispatch(setFitlter('')); dispatch(filterTodos()) }} className={`border-solid border-x border-slate-400 px-2 ${filterQuery === '' && 'underline'}`}>Show all</span>
              <span onClick={() => { dispatch(setFitlter('completed')); dispatch(filterTodos()) }} className={`border-solid border-r border-slate-400 px-2 ${filterQuery === 'completed' && 'underline'}`}>Show completed</span>
              <span onClick={() => { dispatch(setFitlter('uncompleted')); dispatch(filterTodos()) }} className={`pl-2 ${filterQuery === 'uncompleted' && 'underline'}`}>Show uncompleted</span>
            </>
          }

        </div>

        <div className='todo-list mx-auto flex flex-col'>
          {checkTodosLenght()}
        </div>

        {selectedTodos.length !== 0 &&
          <div className='todos-options flex flex-col items-center text-slate-600 mt-4 mb-8 flex-wrap'>
            <div className='flex flex-wrap'>
              <span className='pr-2'>Selected elements: {selectedTodos.length}</span>
            </div>
            <div className='flex flex-wrap justify-center'>
              <span onClick={() => dispatch(clearSelectedTodos())} className='border-solid border-r border-slate-400 px-2'>Cancel</span>
              <span onClick={() => dispatch(deleteTodos())} className='px-2'>Delete</span>
              <span onClick={() => dispatch(markSelectedTodosCompleted())} className='border-solid border-l border-slate-400 px-2'>Mark completed</span>
              <span onClick={() => dispatch(markSelectedTodosUncompleted())} className='border-solid border-l border-slate-400 px-2'>Mark uncompleted</span>
            </div>
          </div>
        }

      </div>

    </div>
  );
}

export default App;
