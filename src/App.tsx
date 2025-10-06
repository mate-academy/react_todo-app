/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoList } from './TodoList';
import { Context, Todo } from './Context/Context';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useContext(Context);

  const allCompleted =
    state.allTodos.length > 0 &&
    state.allTodos.every(todo => todo.completed === true);

  const todosCounter = state.allTodos.filter(
    todo => todo.completed === false,
  ).length;

  const CompletedCount =
    state.allTodos.filter(todo => todo.completed).length < 1;

  const handleDeleteCompleted = () => {
    const todosCleared = state.allTodos.filter(todo => !todo.completed);

    localStorage.setItem('todos', JSON.stringify(todosCleared));

    dispatch({ type: 'SET_TODOS', payload: todosCleared });

    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    const updatedTodos = [...state.todos, newTodo];

    dispatch({ type: 'ADD_TODO', payload: newTodo });

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTitle('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.allTodos));
  }, [state.allTodos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleToogleButton = () => {
    dispatch({ type: 'TOGGLE_ALL' });
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}

          {state.allTodos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToogleButton}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        <TodoList inputRef={inputRef} />

        {state.allTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosCounter} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: state.sortFilter === 'ALL',
                })}
                data-cy="FilterLinkAll"
                onClick={() =>
                  dispatch({ type: 'CHANGE_FILTER', payload: 'ALL' })
                }
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: state.sortFilter === 'ACTIVE',
                })}
                data-cy="FilterLinkActive"
                onClick={() =>
                  dispatch({ type: 'CHANGE_FILTER', payload: 'ACTIVE' })
                }
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: state.sortFilter === 'COMPLETED',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() =>
                  dispatch({ type: 'CHANGE_FILTER', payload: 'COMPLETED' })
                }
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={CompletedCount}
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
