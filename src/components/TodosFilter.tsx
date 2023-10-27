import React from 'react';
import { Status } from '../types/StatusEnum';

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const onFilterChange = (status: Status) => () => {
    setFilter(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === 'all' ? 'selected' : ''}
          onClick={onFilterChange(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : ''}
          onClick={onFilterChange(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={onFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
