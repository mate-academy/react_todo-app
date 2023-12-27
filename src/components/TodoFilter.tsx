import React from 'react';
import { Status } from '../types/Status';

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
          className={filter === Status.All ? 'selected' : ''}
          onClick={onFilterChange(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === Status.Active ? 'selected' : ''}
          onClick={onFilterChange(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === Status.Active ? 'selected' : ''}
          onClick={onFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
