import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../types';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  const handleFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filter === Status.All })}
          onClick={() => handleFilterChange(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filter === Status.Active })}
          onClick={() => handleFilterChange(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filter === Status.Completed })}
          onClick={() => handleFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
