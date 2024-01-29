import { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../types/todo';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const {
    selectedStatus, setSelectedStatus,
  } = useContext(TodosContext);

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: selectedStatus === Status.all })}
          onClick={() => handleStatusClick(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: selectedStatus === Status.active })}
          onClick={() => handleStatusClick(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: selectedStatus === Status.completed })}
          onClick={() => handleStatusClick(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
