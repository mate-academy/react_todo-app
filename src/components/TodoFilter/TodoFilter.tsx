import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  setFilter: (filter: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const onFilterChange = (changeFilter: Filter) => {
    setFilter(changeFilter);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === Filter.All ? 'selected' : ''}
          onClick={() => onFilterChange(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === Filter.Active ? 'selected' : ''}
          onClick={() => onFilterChange(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === Filter.Completed ? 'selected' : ''}
          onClick={() => onFilterChange(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
