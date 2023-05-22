import React, { useState } from 'react';
import classNames from 'classnames';
import { SelectOptions } from '../types/SelectOptions';

type Props = {
  filterTodos: (option: SelectOptions) => void,
  todosCount: number,
  completedTodosCount: number,
  deleteCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  filterTodos,
  todosCount,
  completedTodosCount,
  deleteCompletedTodos,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(SelectOptions.ALL);

  const setCurrentFilter = (filterToSet:SelectOptions) => {
    setSelectedFilter(filterToSet);
    filterTodos(filterToSet);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', {
              selected: selectedFilter === SelectOptions.ALL,
            },
          )}
          onClick={() => {
            setCurrentFilter(SelectOptions.ALL);
          }}
        >
          {SelectOptions.ALL}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', {
              selected: selectedFilter === SelectOptions.ACTIVE,
            },
          )}
          onClick={() => {
            setCurrentFilter(SelectOptions.ACTIVE);
          }}
        >
          {SelectOptions.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', {
              selected: selectedFilter === SelectOptions.COMPLETED,
            },
          )}
          onClick={() => {
            setCurrentFilter(SelectOptions.COMPLETED);
          }}
        >
          {SelectOptions.COMPLETED}
        </a>
      </nav>

      <button
        type="button"
        data-cy="ClearCompletedButton"
        className={classNames('todoapp__clear-completed',
          { hidden: completedTodosCount < 1 })}
        onClick={() => deleteCompletedTodos()}
      >
        Clear completed
      </button>

    </footer>
  );
};
