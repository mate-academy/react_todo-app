/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import { Todolist } from './components/Todolist';
import { TodosProvider, TodosContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { setTodos } = useContext(TodosContext);

  console.log(setTodos);

  const [todo, setTodo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: todo,
      completed: false,
    };

    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, newTodo];

      return newTodos;
    });

    setTodo('');
  };

  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>{todo}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={handleTodo}
              required
              value={todo}
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
          <Todolist />
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
    </TodosProvider>
  );
};
