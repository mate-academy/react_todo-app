import React from 'react';
import cn from 'classnames';
import { useTodos } from '../../utils/TodoContext';
import { Status } from '../../types/types';

export const Filter: React.FC = () => {
  const { setStatus, status } = useTodos();

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: status === Status.ALL,
          })}
          onClick={() => setStatus(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: status === Status.ACTIVE,
          })}
          onClick={() => setStatus(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: status === Status.COMPLETED,
          })}
          onClick={() => setStatus(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
