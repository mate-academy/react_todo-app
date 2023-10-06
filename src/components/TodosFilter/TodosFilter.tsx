import React, { useContext } from 'react';
import classNames from 'classnames';

import './TodosFilter.scss';
import { Status } from '../../types/Status';
import { TodosContext } from '../TodosContext';

export const TodosFilter: React.FC = () => {
  const { currentFilter, setCurrentFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Status.All,
          })}
          onClick={() => setCurrentFilter(Status.All)}
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
          onClick={() => setCurrentFilter(Status.Active)}
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
          onClick={() => setCurrentFilter(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
