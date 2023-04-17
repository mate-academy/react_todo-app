import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export enum StatusOfFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<StatusOfFilter>>;
  filter: StatusOfFilter;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul className="filters">
      <li>
        <Link
          to="#/"
          className={classNames({ selected: filter === StatusOfFilter.All })}
          onClick={() => setFilter(StatusOfFilter.All)}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="#/active"
          className={classNames({ selected: filter === StatusOfFilter.Active })}
          onClick={() => setFilter(StatusOfFilter.Active)}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="#/completed"
          className={classNames({
            selected: filter === StatusOfFilter.Completed,
          })}
          onClick={() => setFilter(StatusOfFilter.Completed)}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
