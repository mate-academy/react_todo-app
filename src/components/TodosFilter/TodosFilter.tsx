import React, { useState } from 'react';

const TodosFilter: React.FC<TodosFilterProps> = ({ applyFilter }) => {
  const filters = {
    all: 'all',
    active: 'active',
    completed: 'completed',
  };

  const [selectedFilter, setSelectedFilter] = useState(filters.all);

  const handleFilterChange = (appliedFilter: string) => {
    setSelectedFilter(appliedFilter);
    applyFilter(appliedFilter);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={selectedFilter === filters.all ? 'selected' : ''}
          onClick={() => handleFilterChange(filters.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={selectedFilter === filters.active ? 'selected' : ''}
          onClick={() => handleFilterChange(filters.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={selectedFilter === filters.completed ? 'selected' : ''}
          onClick={() => handleFilterChange(filters.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodosFilter;
