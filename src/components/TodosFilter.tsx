import React from 'react';
import { Status } from '../types/status';

type Props = {
  currentStatus: Status;
  onChange:(status: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ onChange, currentStatus }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={currentStatus === Status.All ? 'selected' : ''}
          onClick={() => onChange(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={currentStatus === Status.Active ? 'selected' : ''}
          onClick={() => onChange(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={currentStatus === Status.Completed ? 'selected' : ''}
          onClick={() => onChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
