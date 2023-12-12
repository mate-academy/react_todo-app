import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from './TodosContext/TodosContext';
import { Filter } from '../types/Todo';

export const TodosFilter:React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { filterBy } = useContext(StateContext);

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
            selected: selectedFilter === Filter.ALL,
          })}
          onClick={() => handleSelectedFilter(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: selectedFilter === Filter.ACTIVE,
          })}
          onClick={() => handleSelectedFilter(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: selectedFilter === Filter.COMPLETED,
          })}
          onClick={() => handleSelectedFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
