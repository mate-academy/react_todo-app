import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../Context/TodosContext';
import { Status } from '../../type/Status';

export const TodosFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => setFilter(Status.ALL)}
          className={cn({ selected: filter === Status.ALL })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilter(Status.ACTIVE)}
          className={cn({ selected: filter === Status.ACTIVE })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilter(Status.COMPLETED)}
          className={cn({ selected: filter === Status.COMPLETED })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
