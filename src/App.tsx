/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useLocaleStorage } from './hooks/useLocaleStorage';

import { TodoContext } from './TodoContext';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import { Todo } from './types/Todo';

const LOCAL_STORAGE_KEY = 'todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>(LOCAL_STORAGE_KEY, []);

  return (
    <div className="todoapp">
      <TodoContext.Provider value={{ todos, setTodos }}>
        <header className="header">
          <h1>todos</h1>
          <TodoForm />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList items={todos} />
        </section>

        {todos.length !== 0 && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.length}  items left`}
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
        )}
      </TodoContext.Provider>
    </div>
  );
};
