import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);

  const makeSetFilterType = (type: Filter) => (
    () => setFilterType(type));

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filterType === Filter.All ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterType === Filter.Active ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterType === Filter.Completed ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
