import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import { Status } from '../types/Status';

export const TodosFilters = React.memo(() => {
  const { status, setStatus } = useContext(TodosContext);

  // const statusOptions = Object.values(Status);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames('', { selected: status === 'all' })}
          onClick={(e) => {
            e.preventDefault();
            setStatus(Status.all);
          }}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={classNames('', { selected: status === 'active' })}
          onClick={(e) => {
            e.preventDefault();
            setStatus(Status.active);
          }}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={classNames('', { selected: status === 'completed' })}
          onClick={(e) => {
            e.preventDefault();
            setStatus(Status.completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
});
