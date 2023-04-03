import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useTodo } from '../../context/TodoProvider';

type Props = {
  all: boolean;
  active: boolean;
  completedTodo: boolean;
};

export const TodoFilter: React.FC<Props> = ({
  all,
  active,
  completedTodo,
}) => {
  const { setStatus, statusTodo, statusTodosHandler } = useTodo();

  useEffect(() => {
    statusTodosHandler(statusTodo);
  }, [statusTodo]);

  const changeStatus = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (event.currentTarget.textContent) {
      setStatus(event.currentTarget.textContent);
    }
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: all })}
          onClick={changeStatus}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: active })}
          onClick={changeStatus}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: completedTodo })}
          onClick={changeStatus}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
