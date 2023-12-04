import React, { useContext } from 'react';
import { Status } from './Types/Status';
import { TodosContext } from './TodosContext';

export const TodoFilter: React.FC = () => {
  const { setFilter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a href="#/" className="selected" onClick={() => setFilter(Status.All)}>
          All
        </a>
      </li>

      <li>
        <a href="#/active" onClick={() => setFilter(Status.Active)}>
          Active
        </a>
      </li>

      <li>
        <a href="#/completed" onClick={() => setFilter(Status.Completed)}>
          Completed
        </a>
      </li>
    </ul>
  );
};
