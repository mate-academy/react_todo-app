import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Type';
import { TodoContext } from '../context/TodosContext';

export const Filter: React.FC = () => {
  const { status, setStatus } = useContext(TodoContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: status === Status.ALL })}
          onClick={() => setStatus(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: status === Status.ACTIVE })}
          onClick={() => setStatus(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: status === Status.COMLETED })}
          onClick={() => setStatus(Status.COMLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
