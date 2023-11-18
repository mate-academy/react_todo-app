import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  crntFilterState: Filter;
  onFilter: (filter: Filter) => void ;
};

export const TodoFilter: React.FC<Props> = ({ crntFilterState, onFilter }) => {
  const handleFilterChange = (status: Filter) => () => {
    onFilter(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={crntFilterState === 'all' ? 'selected' : ''}
          onClick={handleFilterChange(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={crntFilterState === 'active' ? 'selected' : ''}
          onClick={handleFilterChange(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={crntFilterState === 'completed' ? 'selected' : ''}
          onClick={handleFilterChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
