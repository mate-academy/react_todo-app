/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { DispatchContext } from './state/State';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchContext);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'addTodo', payload: value });
    setValue('');
  };

  const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'toggleAll', payload: event.target.checked });
  };

  useEffect(() => {
    dispatch({ type: 'loadFromStorage' });
  }, [dispatch]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleOnSubmit}>
          <input
            value={value}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => setValue(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
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
  );
};
