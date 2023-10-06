import React, { useContext } from 'react';
import classNames from 'classnames';

import './TodosFilter.scss';
import { Status } from '../../types/Status';
import { TodosContext } from '../TodosContext';

export const TodosFilter: React.FC = () => {
  const { currentFilter, setCurrentFilter } = useContext(TodosContext);

  const onFilterSelect = (status: Status) => () => {
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
          onClick={onFilterSelect(Status.All)}
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
          onClick={onFilterSelect(Status.Active)}
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
          onClick={onFilterSelect(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
