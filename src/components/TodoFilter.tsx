import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { TodosContext } from '../context/TodosContext';

type PropsTodoFilter = {
};

export const TodoFilter: React.FC<PropsTodoFilter> = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter === Status.All })}
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter === Status.Active })}
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter === Status.Completed })}
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
