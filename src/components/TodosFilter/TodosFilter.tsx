import React, { useContext } from 'react';
import classNames from 'classnames';
import { SelectedContext } from '../TodosContext';
import { Status } from '../../types/Status';

export const TodosFilter: React.FC = () => {
  const selected = useContext(SelectedContext);

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({
            selected: selected === Status.All,
          })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: selected === Status.ACTIVE,
          })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: selected === Status.COMPLETED,
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
