/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from './context/TodoContext';
import { TodoComponent } from './components/Todo';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filteredTodos, todosToComplete, selectedFilter } =
    useContext(StateContext);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const isHydrated = useRef(false);

  /* Hydrate todos from local storage */
  useEffect(() => {
    const localTodos = localStorage.getItem('todos');

    if (localTodos) {
      dispatch({
        type: 'HYDRATE_TODOS',
        payload: JSON.parse(localTodos),
      });
    }

    isHydrated.current = true;
  }, [dispatch]);

  /* Save todos to local storage */
  useEffect(() => {
    if (!isHydrated.current) {
      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmedTitle = newTodoTitle.trim();

    if (trimmedTitle.length > 0) {
      dispatch({ type: 'ADD_TODO', payload: { title: trimmedTitle } });
      setNewTodoTitle('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (
      target.closest('[data-cy="TodoDelete"]') ||
      target.closest('[data-cy="ClearCompletedButton"]')
    ) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="todoapp" onClick={e => handleGlobalClick(e)}>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todosToComplete === 0 && todos.length !== 0,
              })}
              data-cy="ToggleAllButton"
              onClick={() =>
                dispatch({
                  type: 'CHECK_AS_COMPLETED',
                  payload: {
                    completed: todosToComplete === 0,
                  },
                })
              }
            />
          )}

          <form
            onSubmit={event => handleSubmit(event)}
            onBlur={() => handleSubmit()}
          >
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosToComplete} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: selectedFilter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  dispatch({
                    type: 'SET_SELECTED_FILTER',
                    payload: { selectedFilter: 'all' },
                  });
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: selectedFilter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  dispatch({
                    type: 'SET_SELECTED_FILTER',
                    payload: { selectedFilter: 'active' },
                  });
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: selectedFilter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  dispatch({
                    type: 'SET_SELECTED_FILTER',
                    payload: {
                      selectedFilter: 'completed',
                    },
                  });
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className={cn('todoapp__clear-completed', {
                'is-invisible': todosToComplete === todos.length,
              })}
              disabled={todosToComplete === todos.length}
              data-cy="ClearCompletedButton"
              onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
