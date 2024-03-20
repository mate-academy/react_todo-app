import React from 'react';
import { Status } from '../../types/types';

export const TodosFilter: React.FC<{
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>;
}> = ({ filterStatus, setFilterStatus }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={`#/${status}`}
            className={status === filterStatus ? 'selected' : ''}
            onClick={() => setFilterStatus(status as Status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
