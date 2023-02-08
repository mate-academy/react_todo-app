import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { Status } from '../types/Status';

export const TodoFilter: React.FC = () => {
  const match = useMatch('/:filterOption');

  return (
    <ul className="filters">
      <li>
        <Link
          to="../"
          className={classNames({
            selected: !match?.params.filterOption,
          })}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="../active"
          className={classNames({
            selected: match?.params.filterOption === Status.Active,
          })}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="../completed"
          className={classNames({
            selected: match?.params.filterOption === Status.Completed,
          })}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
