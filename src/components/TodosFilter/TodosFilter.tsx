import { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../types';

export const TodosFilter: React.FC = () => {
  const { filterStatus, setFilterStatus } = useContext(TodosContext);

  const handleNewStatus = (status: Status) => {
    setFilterStatus(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          data-cy="todosFilter"
          className={classNames({ selected: filterStatus === Status.All })}
          onClick={() => handleNewStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          data-cy="todosFilter"
          className={classNames({ selected: filterStatus === Status.Active })}
          onClick={() => handleNewStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          data-cy="todosFilter"
          className={classNames({
            selected: filterStatus === Status.Completed,
          })}
          onClick={() => handleNewStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
