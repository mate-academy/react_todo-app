import React, { useState } from 'react';
import { Status } from '../types/Status';

interface TodosFilterProps {
  filter: Status;
  onFilterChange: (status: Status) => void;
}

export const TodosFilter: React.FC<TodosFilterProps> = () => {
  const [filter, setFilter] = useState<Status>(Status.All);

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === Status.All ? 'active' : ''}
          onClick={() => handleFilterChange(Status.All)}
        >
          All
        </a>
      </li>
      <li>
        <a href="#/active" onClick={() => handleFilterChange(Status.Active)}>
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          onClick={() => handleFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
