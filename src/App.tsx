/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useLocaleStorage } from './hooks/useLocaleStorage';

import { TodoContext } from './TodoContext';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoAllChecked } from './components/TodoAllChecked';
import { TodoClear } from './components/TodoClear';

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
          <TodoAllChecked />
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

            <TodoClear />
          </footer>
        )}
      </TodoContext.Provider>
    </div>
  );
};
