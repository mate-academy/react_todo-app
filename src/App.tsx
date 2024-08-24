/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './utils/TodosContext';
import { Todo } from './types/TodoType';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { todos, addTodo, clearCompletedTodos, updateTodo } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const location = useLocation();

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const allTodosCompleted = todos.every(todo => todo.completed);

  const inputElement = useRef<HTMLInputElement>(null);

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

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);

    todos.forEach(todo => {
      updateTodo(todo.id, { completed: !allCompleted });
    });
  };

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllTodos}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={inputElement}
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodos} items left
            </span>

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

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={clearCompletedTodos}
              disabled={completedTodos === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
