import React, { useState, useEffect } from 'react';
// import { Filter } from '../constants/Filter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        title,
        id: +new Date(),
        completed: false,
      },
    ]);

    setTitle('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={({ target }) => setTitle(target.value.trimLeft())}
          />
        </form>
      </header>

      <footer className="footer">
        <span className="todo-count">
          {todos.length}
        </span>
      </footer>
    </>
  );
};
