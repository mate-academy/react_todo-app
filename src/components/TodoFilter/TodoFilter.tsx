import React from 'react';
import cn from 'classnames';

import { FilterBy } from '../../types/FilterBy';
import { useTodos } from '../../store/Store';

const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  const handleClick = (filters: FilterBy) => () => {
    setFilter(filters);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          onClick={handleClick(FilterBy.ALL)}
          className={cn({
            selected: filter === FilterBy.ALL,
          })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={handleClick(FilterBy.ACTIVE)}
          className={cn({
            selected: filter === FilterBy.ACTIVE,
          })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={handleClick(FilterBy.COMPLETED)}
          className={cn({
            selected: filter === FilterBy.COMPLETED,
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodoFilter;
