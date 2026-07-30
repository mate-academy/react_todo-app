import classNames from 'classnames';
import React from 'react';
import { FilteredStatus } from '../types/FilteredStatus';

interface Props {
  activeTodosCount: number;
  filter: FilteredStatus;
  setFilter: (filter: FilteredStatus) => void;
  handleClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  filter,
  setFilter,
  handleClearCompleted,
  hasCompletedTodos,
}) => {
  const filterOptions: {
    type: FilteredStatus;
    label: string;
    href: string;
    cy: string;
  }[] = [
    { type: 'all', label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      type: 'active',
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      type: 'completed',
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterOptions.map(({ type, label, href, cy }) => (
          <a
            key={type}
            href={href}
            className={classNames('filter__link', {
              selected: filter === type,
            })}
            data-cy={cy}
            onClick={() => setFilter(type)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
