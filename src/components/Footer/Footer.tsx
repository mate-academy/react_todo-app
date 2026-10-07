import React from 'react';
import { Filter } from '../../types/Filter';

interface FooterProps {
  activeCount: number;
  completedCount: number;
  currentFilter: Filter;
  onClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  completedCount,
  currentFilter,
  onClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} item${activeCount === 1 ? '' : 's'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${
            currentFilter === Filter.All ? 'selected' : ''
          }`}
          data-cy="FilterLinkAll"
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${
            currentFilter === Filter.Active ? 'selected' : ''
          }`}
          data-cy="FilterLinkActive"
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${
            currentFilter === Filter.Completed ? 'selected' : ''
          }`}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
