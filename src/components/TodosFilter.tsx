import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../context/ToDoContext';
import { Status } from '../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, setStatus } = useContext(TodosContext);

  const [filter, setFilter] = useState<Status>(status);

  const handleFiltrationClick = (filtratingStatus: Status) => {
    setFilter(filtratingStatus);
    setStatus(filtratingStatus);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter === Status.All })}
          onClick={() => handleFiltrationClick(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter === Status.Active })}
          onClick={() => handleFiltrationClick(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter === Status.Completed })}
          onClick={() => handleFiltrationClick(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
