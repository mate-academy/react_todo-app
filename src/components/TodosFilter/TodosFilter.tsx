import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Status } from '../../types/enums/Status';
import { DispatchContext } from '../../TodosContext';
import { ReducerType } from '../../types/enums/ReducerType';

export const TodosFilter: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const dispatch = useContext(DispatchContext);

  const filterToStatusMap: { [key: string]: Status } = {
    All: Status.All,
    Active: Status.Active,
    Completed: Status.Completed,
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const name = event.currentTarget.dataset.name || 'All';
    const status = filterToStatusMap[name];

    setFilter(name);

    dispatch({
      type: ReducerType.SetFilter,
      payload: status,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter === Status.All })}
          data-name={Status.All}
          onClick={handleFilterClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter === Status.Active })}
          data-name={Status.Active}
          onClick={handleFilterClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter === Status.Completed })}
          data-name={Status.Completed}
          onClick={handleFilterClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
