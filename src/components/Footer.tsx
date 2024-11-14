import React from 'react';
import { Filter } from './TodoApp';
import classNames from 'classnames';

interface FooterProps {
  activeCount: number;
  hasCompletedTodos: boolean;
  currFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
  onToggleAll: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  hasCompletedTodos,
  currFilter,
  onFilterChange,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(filter => {
        const capitalizedFilter =
          filter[0].toUpperCase() + filter.slice(1).toLowerCase();

        return (
          <a
            key={filter}
            href={`#/${filter === Filter.All ? '' : filter}`}
            className={classNames('filter__link', {
              selected: currFilter === filter,
            })}
            data-cy={`FilterLink${capitalizedFilter}`}
            onClick={() => onFilterChange(filter)}
          >
            {capitalizedFilter}
          </a>
        );
      })}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompletedTodos}
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);
