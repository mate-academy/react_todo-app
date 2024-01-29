import classNames from 'classnames';
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, changeStatus } = useContext(TodoContext);

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({ selected: status === Status.All })}
          onClick={() => changeStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: status === Status.Active })}
          onClick={() => changeStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: status === Status.Completed })}
          onClick={() => changeStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
