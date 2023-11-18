import React from 'react';
import cn from 'classnames';

import { Filter } from '../../types/Filter';

type Props = {
  crntFilterState: Filter;
  onFilter: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ crntFilterState, onFilter }) => {
  const handleFilterChange = (status: Filter) => () => {
    onFilter(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: crntFilterState === Filter.ALL,
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
            selected: crntFilterState === Filter.ACTIVE,
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
            selected: crntFilterState === Filter.COMPLETED,
          })}
          onClick={handleFilterChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
