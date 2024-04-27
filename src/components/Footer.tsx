import React, { useContext, useMemo } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { setFilter, todos, filter, setTodos } = useContext(TodoContext);

  const remainingTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {remainingTodosCount} {remainingTodosCount === 1 ? 'item' : 'items'}
            {' '}
            left
          </span>
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === 'All',
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilter('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === 'Active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter('Completed')}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={clearCompleted}
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
