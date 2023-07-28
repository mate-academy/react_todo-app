import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filterType === Filter.ALL ? 'selected' : ''}
          onClick={() => setFilterType(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterType === Filter.ACTIVE ? 'selected' : ''}
          onClick={() => setFilterType(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterType === Filter.COMPLETED ? 'selected' : ''}
          onClick={() => setFilterType(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
