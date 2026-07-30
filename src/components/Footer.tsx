import React, { useContext } from 'react';
import cn from 'classnames';
import { Context } from '../Context';
import { FilterStatus } from '../types/FilterStatus';

const FILTER_LINKS = [
  {
    type: FilterStatus.All,
    href: '#/',
    label: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    type: FilterStatus.Active,
    href: '#/active',
    label: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: FilterStatus.Completed,
    href: '#/completed',
    label: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];

type Props = {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, clearCompleted, focusInput } = useContext(Context);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const handleClearCompleted = () => {
    clearCompleted();
    focusInput();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTER_LINKS.map(({ type, href, label, dataCy }) => (
          <a
            key={type}
            href={href}
            className={cn('filter__link', { selected: filter === type })}
            data-cy={dataCy}
            onClick={() => onFilterChange(type)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
