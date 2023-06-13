import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';

type Props = {
  todoStatus: Status,
  setTodoStatus: (status: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({ todoStatus, setTodoStatus }) => {
  const handleAllTodos = () => {
    setTodoStatus(Status.All);
  };

  const handleActiveTodos = () => {
    setTodoStatus(Status.Active);
  };

  const handleCompletedTodos = () => {
    setTodoStatus(Status.Completed);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: todoStatus === Status.All })}
          onClick={handleAllTodos}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: todoStatus === Status.Active,
          })}
          onClick={handleActiveTodos}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: todoStatus === Status.Completed,
          })}
          onClick={handleCompletedTodos}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
