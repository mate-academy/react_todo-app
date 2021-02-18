import React, {useState}  from 'react';
import {TodoList} from '../TodoList'

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [checkboxDisabled, setcheckboxState] = useState(true);

  const getCheckedTodoId = (chosenId) => {
   const chosenTodo = todos.find(todo=>todo.id === chosenId);
   chosenTodo.completed = !chosenTodo.completed;
     if (todos.every(todo=> todo.completed)){
        setcheckboxState(false)
    } else {
      setcheckboxState(true)
    }
  }

  const changeHandler = (e) => {
    setTodo(e.target.value)
  }
  const preparedTodo = {
    todo: todo,
    completed: false,
    id: +(new Date()),
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setTodos(currentState => ([
      ...currentState,
      preparedTodo
    ]));
    clearInput();
  }
  function clearInput() {
    setTodo('');
  }
  return (
    <section className="todoapp">
    <header className="header">
      <h1>todos</h1>
      <h2>Uncompleted todos = {todos.filter(todo=>!todo.completed).length}</h2>
      <form
        onSubmit={submitHandler}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={changeHandler}
        />
      </form>
    </header>

    <section className="main">
      <input 
        type="checkbox" 
        id="toggle-all" 
        className="toggle-all" 
        disabled={checkboxDisabled}
        /*onChange={handleCheck}*/
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList 
        items={todos}
        getCheckedTodoId={getCheckedTodoId}
       />
      
    </section>

    <footer className="footer">
      <span className="todo-count">
        3 items left
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
    
  </section>
  )
}
