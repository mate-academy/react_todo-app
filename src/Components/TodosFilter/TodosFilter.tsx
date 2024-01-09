import React, { useContext, useState } from 'react';
import cn from 'classnames';

import { DispatchContext } from '../../Context/TodoContext';
import { Status } from '../../Types/Status';
import { ReducerType } from '../../Types/ReducerType';

export const TodosFilter: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const dispatch = useContext(DispatchContext);

  const handleFilterChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const name = e.currentTarget.dataset.name as Status;

    setFilter(name);

    dispatch({
      type: ReducerType.SetFilter,
      payload: name,
    });
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: filter === Status.ALL })}
          data-name={Status.ALL}
          onClick={handleFilterChange}
        >
          All
        </a>
      </li>

      <li>
        <a
          className={cn({ selected: filter === Status.ACTIVE })}
          href="#/active"
          data-name={Status.ACTIVE}
          onClick={handleFilterChange}
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={cn({ selected: filter === Status.COMPLETED })}
          href="#/completed"
          data-name={Status.COMPLETED}
          onClick={handleFilterChange}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
