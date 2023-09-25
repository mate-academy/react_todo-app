import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../Store';

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosFilter: React.FC = () => {
  const { todosStatus, setTodosStatus } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: todosStatus === Status.All })}
          onClick={() => setTodosStatus(Status.All)}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: todosStatus === Status.Active })}
          onClick={() => setTodosStatus(Status.Active)}
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: todosStatus === Status.Completed })}
          onClick={() => setTodosStatus(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
