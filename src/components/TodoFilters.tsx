import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../contexts/TodoContext';
import { Filter } from '../types/Filter';

export const TodoFilters: React.FC = () => {
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
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
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
          className={classNames({
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
          className={classNames({
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
