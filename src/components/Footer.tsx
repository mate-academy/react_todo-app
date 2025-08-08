import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../constants/constants';

const FILTER_LABELS: Record<FilterType, string> = {
  [FilterType.All]: 'All',
  [FilterType.Active]: 'Active',
  [FilterType.Completed]: 'Completed',
};

interface Props {
  todosCount: number;
  filterBy: FilterType;
  setFilterBy: (filter: FilterType) => void;
  hasCompleted: boolean;
  handleClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  todosCount,
  filterBy,
  setFilterBy,
  hasCompleted,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount} items left
      </span>

      <nav className="filter" data-cy="Filter" aria-label="Filter todos">
        {Object.values(FilterType).map(type => (
          <a
            key={type}
            href={`#/${type === FilterType.All ? '' : type}`}
            className={classNames('filter__link', {
              selected: filterBy === type,
            })}
            data-cy={`FilterLink${type[0].toUpperCase()}${type.slice(1)}`}
            onClick={() => setFilterBy(type)}
          >
            {FILTER_LABELS[type]}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: !hasCompleted,
        })}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!hasCompleted}
        aria-disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
