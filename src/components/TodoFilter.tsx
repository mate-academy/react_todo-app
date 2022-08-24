import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  path: string,
};

export const TodoFilter: React.FC<Props> = ({ path }) => (
  <ul className="filters">
    <li>
      <Link
        to="/"
        className={classNames({
          selected: path === '/',
        })}
      >
        All
      </Link>
    </li>

    <li>
      <Link
        to="/active"
        className={classNames({
          selected: path === '/active',
        })}
      >
        Active
      </Link>
    </li>

    <li>
      <Link
        to="/completed"
        className={classNames({
          selected: path === '/completed',
        })}
      >
        Completed
      </Link>
    </li>
  </ul>
);
