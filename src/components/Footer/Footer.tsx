import React from 'react';
import classNames from 'classnames';
import { useTodos } from '../../context/TodoContext';
import { FILTERS, FilterType } from '../../constants';

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const handleFilterChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newFilter: FilterType,
  ) => {
    e.preventDefault();
    setFilter(newFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount}
        {activeTodosCount === 1 ? ' item left' : ' items left'}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FILTERS.all,
          })}
          data-cy="FilterLinkAll"
          onClick={e => handleFilterChange(e, FILTERS.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FILTERS.active,
          })}
          data-cy="FilterLinkActive"
          onClick={e => handleFilterChange(e, FILTERS.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FILTERS.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => handleFilterChange(e, FILTERS.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!completedTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
