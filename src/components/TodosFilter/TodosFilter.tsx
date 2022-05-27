import React, { useState } from 'react';
import Filters from '../../enums/enums';

const TodosFilter: React.FC<TodosFilterProps> = ({ applyFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState(Filters.All);

  const handleFilterChange = (appliedFilter: Filters) => {
    setSelectedFilter(appliedFilter);
    applyFilter(appliedFilter);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={selectedFilter === Filters.All ? 'selected' : ''}
          onClick={() => handleFilterChange(Filters.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={selectedFilter === Filters.Active ? 'selected' : ''}
          onClick={() => handleFilterChange(Filters.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={selectedFilter === Filters.Completed ? 'selected' : ''}
          onClick={() => handleFilterChange(Filters.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodosFilter;
