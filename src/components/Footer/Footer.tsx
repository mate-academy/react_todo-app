import React from 'react';
import classNames from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  todosCountByStatus: {
    active: number,
    completed: number,
  },
  filterOption: FilterOptions,
  setFilterOption: (option: FilterOptions) => void,
  handleDeleteCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  todosCountByStatus: { active, completed },
  filterOption,
  setFilterOption,
  handleDeleteCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${active} items left`}
      </span>

      <nav className="filter">
        {Object.entries(FilterOptions).map(([key, value]) => {
          return (
            <a
              key={key}
              href={value === FilterOptions.All
                ? '#/'
                : `#/${value}`}
              className={classNames('filter__link', {
                selected: filterOption === value,
              })}
              onClick={() => {
                setFilterOption(
                  (FilterOptions)[key as keyof typeof FilterOptions],
                );
              }}
            >
              {key}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!completed}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
