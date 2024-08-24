/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './utils/TodosContext';
import { Todo } from './types/TodoType';

export const App: React.FC = () => {
  const { todos, addTodo, clearCompletedTodos } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const location = useLocation();

  const filteredTodos = todos.filter(todo => {
    switch (location.pathname) {
      case '/active':
        return !todo.completed;
      case '/completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event?.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: newTodoTitle.trim(),
      completed: false,
    };

    addTodo(newTodo);

    setNewTodoTitle('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              value={newTodoTitle}
              onChange={handleInputChange}
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkAll"
            >
              All
            </NavLink>

            <NavLink
              to="/active"
              className={({ isActive }) =>
                isActive ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkActive"
            >
              Active
            </NavLink>

            <NavLink
              to="/completed"
              className={({ isActive }) =>
                isActive ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkCompleted"
            >
              Completed
            </NavLink>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={clearCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
};
