import React from 'react';
import { Filters } from '../App';
import classNames from 'classnames';

interface Props {
  handleFilterChange: (filterT: Filters) => void;
  filterType: Filters;
  activeTodosCount: number;
  todosCount: number;
  clearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  handleFilterChange,
  filterType,
  activeTodosCount,
  todosCount,
  clearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={todosCount === activeTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
