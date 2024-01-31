import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';
import { DispatchContext, StateContext } from '../Provaider/TodoContext';

export const TodosFilter: React.FC = () => {
  const { filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [selectedFilter, setSelectedFilter] = useState(filterBy);

  const handlerSelectedFilter = (filter: Filter) => {
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
          className={cn({
            selected: selectedFilter === Filter.ALL,
          })}
          onClick={() => handlerSelectedFilter(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: selectedFilter === Filter.ACTIVE,
          })}
          onClick={() => handlerSelectedFilter(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: selectedFilter === Filter.COMPLETED,
          })}
          onClick={() => handlerSelectedFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
