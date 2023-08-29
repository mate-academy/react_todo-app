/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useReducer, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import {
  TodoContext, TodoProvider, initialTodos, reducer,
} from './context/TodoContext';

export const App: React.FC = () => {
  // const [todos, dispatch] = useReducer(reducer, initialTodos);
  const { todos, dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  // const todosContext = useContext(TodoContext);

  const addTodo = () => {
    dispatch({
      type: 'addTodo',
      payload: title,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo();

    setTitle('');
  };

  return (
    <TodoProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              value={title}
              placeholder="What needs to be done?"
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={todos} />

        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
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
      </div>
    </TodoProvider>
  );
};
