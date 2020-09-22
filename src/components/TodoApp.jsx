import React, { useState, useEffect } from 'react';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';
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

      {todos && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            setTodos={setTodos}
          />
        </section>
      )}
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.length} item(s) left`}
          </span>

          <TodoFilter todos={todos} />
        </footer>
      )}
    </>
  );
};
