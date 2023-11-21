import React from 'react';
import { Status } from '../Types/Status';

interface TodosFilterProps {
  activeStatus: Status;
  onFilterChange: (status: Status) => void;
}

const TodosFilter: React.FC<TodosFilterProps> = (
  { activeStatus, onFilterChange },
) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={`#/${status.toLowerCase()}`}
            className={status === activeStatus ? 'selected' : ''}
            onClick={() => onFilterChange(status as Status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodosFilter;
