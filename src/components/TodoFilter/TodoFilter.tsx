import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, changheStatus } = useContext(TodoContext);

  const handleClick = (selectedStatus: Status) => {
    changheStatus(selectedStatus);
  };

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({
            selected: status === Status.All,
          })}
          onClick={() => handleClick(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: status === Status.Active,
          })}
          onClick={() => handleClick(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: status === Status.Completed,
          })}
          onClick={() => handleClick(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
