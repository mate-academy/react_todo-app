import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { Filter } from '../types/Types';
import { DispatchContext, StateContext } from '../managment/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [selectedFilter, setSelectedFilter] = useState(filterBy);

  const handleSelectedFilter = (filter: Filter) => {
    setSelectedFilter(filter);

    dispatch({
      type: 'filter',
      payload: filter,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: selectedFilter === Filter.All })}
          onClick={() => handleSelectedFilter(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: selectedFilter === Filter.Active })}
          onClick={() => handleSelectedFilter(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: selectedFilter === Filter.Completed })}
          onClick={() => handleSelectedFilter(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
