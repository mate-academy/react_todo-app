import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/types';

export const TodosFilter: React.FC<{
  filterStatus: Status;
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>;
}> = ({ filterStatus, setFilterStatus }) => {
  return (
    <ul className="filters">
      {Object.values(Status).map(status => (
        <li key={status} data-cy="todosFilter">
          <a
            href={`#/${status}`}
            className={cn({ selected: status === filterStatus })}
            onClick={() => setFilterStatus(status as Status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
