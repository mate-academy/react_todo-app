import React from 'react';
import { Status } from '../../types/FilterStatus';

type Props = {
  status: Status;
  onFilterChange: (status: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ status, onFilterChange }) => (
  <ul className="filters" data-cy="todosFilter">
    <li>
      <a
        href="#/"
        className={status === Status.all ? 'selected' : ''}
        onClick={() => onFilterChange(Status.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={status === Status.active ? 'selected' : ''}
        onClick={() => onFilterChange(Status.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={status === Status.completed ? 'selected' : ''}
        onClick={() => onFilterChange(Status.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);
