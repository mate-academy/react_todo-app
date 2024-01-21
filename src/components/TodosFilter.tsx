import { useState } from 'react';
import { Status } from '../types/todo';

type Props = {
  setFilterStatus: (status: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({ setFilterStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(Status.all);

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
    setFilterStatus(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={`${selectedStatus === Status.all ? 'selected' : ''}`}
          onClick={() => handleStatusClick(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={`${selectedStatus === Status.active ? 'selected' : ''}`}
          onClick={() => handleStatusClick(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={`${selectedStatus === Status.completed ? 'selected' : ''}`}
          onClick={() => handleStatusClick(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
