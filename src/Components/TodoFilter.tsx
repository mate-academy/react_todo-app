import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../Context/TodosContext';
import { Status } from '../Types/Status';

export const TodosFilter: React.FC = () => {
  const { statusQuery, setStatusQuery } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: statusQuery === Status.All,
          })}
          onClick={() => setStatusQuery(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: statusQuery === Status.Active,
          })}
          onClick={() => setStatusQuery(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: statusQuery === Status.Completed,
          })}
          onClick={() => setStatusQuery(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
