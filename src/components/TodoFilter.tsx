// TodosFilter.tsx
import React, { useState } from 'react';

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosFilter: React.FC = () => {
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
        <a
          href="#/active"
          onClick={() => handleFilterChange(Status.Active)}
        >
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
