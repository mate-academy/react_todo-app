import React from 'react';
import cn from 'classnames';

import { FilterType, Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterType: FilterType,
  setFilterType: (filter: FilterType) => void,
  handleClearCompleted: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
  handleClearCompleted,
}) => {
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleFilterType = (filter: FilterType) => () => {
    setFilterType(filter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.ALL,
            },
          )}
          onClick={handleFilterType(FilterType.ALL)}
        >
          {FilterType.ALL}
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.ACTIVE,
            },
          )}
          onClick={handleFilterType(FilterType.ACTIVE)}
        >
          {FilterType.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.COMPLETED,
            },
          )}
          onClick={handleFilterType(FilterType.COMPLETED)}
        >
          {FilterType.COMPLETED}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
