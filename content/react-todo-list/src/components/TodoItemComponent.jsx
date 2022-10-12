import { deleteOneTodo, selectTodos, markOneCompleted, searchTodoItem } from "../redux/slices/todoSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { useEffect } from "react";

function TodoItemComponent({ todo, index }) {
  const dispatch = useDispatch()
  const [deleting, setDeleting] = useState(false)
  const [checkedInput, setCheckedInput] = useState(false)
  const { selectedTodos, todos, searchQuery } = useSelector(state => state.todoSlice)

  const deleteItem = (id) => {
    setDeleting(true)
    setTimeout(() => {
      dispatch(deleteOneTodo(id))
    }, 300)
  }

  useEffect(() => {
    if (selectedTodos.includes(todo.id)) {
      setCheckedInput(true)
    } else {
      setCheckedInput(false)
    }
  }, [selectedTodos])

  useEffect(()=>{
    dispatch(searchTodoItem(searchQuery))
  }, [todos])

  return (
    <div  className={`todo-item flex items-center transition w-100 ${deleting && 'scale-y-0'} ${checkedInput&&'todo-item-selected'} ${todo.completed && 'todo-item-completed'}`}>
      <div onClick={() => dispatch(selectTodos(todo.id))} className='todo-value flex w-11/12 items-center'>
        <div className={`todo-name ml-2`}>{todo.name}</div>
      </div>
      <div className='delete-todo w-2/12 sm:w-1/12 flex items-center mr-3 md:mr-0'>
        <svg className={`cursor-pointer bi bi-trash3`} onClick={() => deleteItem(todo.id)} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>
        <svg onClick={()=>dispatch(markOneCompleted(todo.id))} className={`bi bi-check2 cursor-pointer transition-all ml-4`}  xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="2.4vh" fill={`${todo.completed?'green':'gray'}`} viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
      </div>
    </div>
  );
}

export default TodoItemComponent;
