import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../management/TodoContext';
import { Filter } from '../types/Filter';

export const TodoFilter: React.FC = () => {
  const { filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [selectedFilter, setSelectedfilter] = useState(filterBy);

  const handleSelectedFilter = (filter: Filter) => {
    setSelectedfilter(filter);

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
          className={cn({
            selected: selectedFilter === Filter.all,
          })}
          onClick={() => handleSelectedFilter(Filter.all)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={cn({
            selected: selectedFilter === Filter.active,
          })}
          onClick={() => handleSelectedFilter(Filter.active)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={cn({
            selected: selectedFilter === Filter.completed,
          })}
          onClick={() => handleSelectedFilter(Filter.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
