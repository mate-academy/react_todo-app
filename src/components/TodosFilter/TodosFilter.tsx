import React from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  filter: Status,
  onFilterChange: (filter: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Status.ALL,
          })}
          onClick={() => {
            onFilterChange(Status.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Status.ACTIVE,
          })}
          onClick={() => {
            onFilterChange(Status.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Status.COMPLETED,
          })}
          onClick={() => {
            onFilterChange(Status.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
