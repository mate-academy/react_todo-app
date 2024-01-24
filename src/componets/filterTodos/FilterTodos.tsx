import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../managment/Contextes';
import { Filter } from '../../types/Filter';

export const FilterTodo: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { filterTp } = useContext(StateContext);

  const [stateFilter, setStateFilter] = useState(filterTp);

  const handleFilter = (filter: Filter) => {
    setStateFilter(filter);
    dispatch({
      type: 'filter',
      payload: filter,
    });
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={stateFilter === Filter.all ? 'selected' : ''}
          onClick={() => handleFilter(Filter.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={stateFilter === Filter.active ? 'selected' : ''}
          onClick={() => handleFilter(Filter.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={stateFilter === Filter.completed ? 'selected' : ''}
          onClick={() => handleFilter(Filter.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
