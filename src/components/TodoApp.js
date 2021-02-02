import React, { useState } from 'react';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [countNotCompleted, setCountNotCompleted] = useState(0);

  const addTodo = () => {
    if (title.trim()) {
      const todo = { id: +new Date(),
        title,
        completed: false };

      setTodos([...todos, todo]);
      setCountNotCompleted(count => count + 1);
    }

    setTitle('');
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </form>
      </header>

      <TodoList items={todos} />

      <footer className="footer">
        <span className="todo-count">
          {countNotCompleted}
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
    </>
  );
};
