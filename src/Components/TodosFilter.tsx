import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../Contexts/TodosContext';
import { Status } from '../Types/Status';

export const TodosFilter: React.FC = () => {
  const { query, setQuery } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: query === Status.All,
          })}
          onClick={() => setQuery(Status.All)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={cn({
            selected: query === Status.Active,
          })}
          onClick={() => setQuery(Status.Active)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={cn({
            selected: query === Status.Completed,
          })}
          onClick={() => setQuery(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
