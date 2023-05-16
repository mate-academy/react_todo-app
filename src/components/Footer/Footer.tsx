/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classNames from 'classnames';

import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  setFilter: (value: FilteredBy) => void;
  filteredBy: FilteredBy;
  activeTodoAmount: number;
  isCompletedPresent: boolean;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  setFilter,
  filteredBy,
  activeTodoAmount,
  isCompletedPresent,
  clearCompleted,
}) => {
  const filterOptions = [
    FilteredBy.All, FilteredBy.Active, FilteredBy.Completed,
  ];

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {activeTodoAmount} item{activeTodoAmount !== 1 ? 's' : ''} left
      </span>

      <nav className="filter">
        {filterOptions.map(item => (
          <a
            key={item}
            href={`#/${item === FilteredBy.All ? '' : item.toLocaleLowerCase()}`}
            className={classNames(
              'filter__link', { selected: item === filteredBy },
            )}
            onClick={() => setFilter(item)}
          >
            {item[0].toUpperCase() + item.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: `${isCompletedPresent ? 'visible' : 'hidden'}`,
        }}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
