import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const handleInput = ({ target }) => {
    setValue(target.value);
  };

  const addTodo = (title) => {
    const id = +new Date();

    setTodos(current => ([
      ...current,
      { title, id, completed: false },
    ]));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          addTodo(value);
        }}
        >
          <input
            value={value}
            onChange={handleInput}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={todos} />
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
  );
}

export default App;
