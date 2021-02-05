import React, { useState } from 'react';
import { TodoList } from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isComplited, setIsComplited] = useState(false);

  const addTodo = () => {
    if (todoTitle.trim().length > 0) {
      const newTodo = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodoTitle('');
  };

  const notCompleted = todos.filter(todo => !todo.completed);

  const onChangeStatus = () => {
    if (isComplited) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }

    setIsComplited(!isComplited);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={onChangeStatus}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {notCompleted.length}
          {' '}
          items left
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
  );
}

export default App;
