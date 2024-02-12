import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Status } from '../types/status';
import { dispatchContext, stateContext } from '../manage/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filterBy } = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const [selectedFilter, setSelectedFilter] = useState(filterBy);

  const handleSelectedFilter = (status: Status) => {
    setSelectedFilter(status);

    dispatch({
      type: 'filter',
      payload: status,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: selectedFilter === Status.ALL,
          })}
          onClick={() => handleSelectedFilter(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            active: selectedFilter === Status.ACTIVE,
          })}
          onClick={() => handleSelectedFilter(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            completed: selectedFilter === Status.COMPLETED,
          })}
          onClick={() => handleSelectedFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
