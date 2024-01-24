import { useContext } from 'react';
import { Status } from '../types/todo';
import { TodosContext } from './TodosContext';

type Props = {};

export const TodosFilter: React.FC<Props> = () => {
  const {
    selectedStatus, setSelectedStatus,
  } = useContext(TodosContext);

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
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
