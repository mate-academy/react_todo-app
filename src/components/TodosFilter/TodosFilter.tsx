import React, { useContext } from 'react';
import cn from 'classnames';

import { Filter } from '../../types/Filter';
import { TodosContext } from '../../TodosContext';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);
  const handleFilterChange = (status: Filter) => () => {
    setFilter(status);
  };

  // eslint-disable-next-line no-console
  console.debug('render TodoFilter');

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filter === Filter.ALL,
          })}
          onClick={handleFilterChange(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filter === Filter.ACTIVE,
          })}
          onClick={handleFilterChange(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filter === Filter.COMPLETED,
          })}
          onClick={handleFilterChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
