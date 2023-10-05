import React, { useContext } from 'react';
import classNames from 'classnames';

import { Status } from '../../types/Status';
import { FilterContext, SetFilterContext } from '../TodosContext';

export const TodosFilter: React.FC = () => {
  const currentFilter = useContext(FilterContext);
  const setCurrentFilter = useContext(SetFilterContext);

  const handleFilterChange = (status: Status) => {
    setCurrentFilter(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Status.All,
          })}
          onClick={() => handleFilterChange(Status.All)}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: currentFilter === Status.Active,
          })}
          onClick={() => handleFilterChange(Status.Active)}
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: currentFilter === Status.Completed,
          })}
          onClick={() => handleFilterChange(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
