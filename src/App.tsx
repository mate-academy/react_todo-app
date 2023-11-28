/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoContext, TodoProvider } from './TodoContext';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleTodoFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const reset = () => {
      setTitle('');
    };

    if (title.trim()) {
      const todo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      setTodos([...todos, todo]);
      reset();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todoTitle = event.target.value;

    setTitle(todoTitle);
  };

  return (
    <div className="todoapp">
      <TodoProvider>
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleTodoFormSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={handleTitleChange}
              value={title}
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
          <TodoList items={todos} />
        </section>

        {todos.length !== 0 && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {/* {`${todos.length}  items left`} */}
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
      </TodoProvider>
    </div>
  );
};
