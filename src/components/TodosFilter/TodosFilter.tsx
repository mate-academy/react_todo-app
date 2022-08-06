import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Status from '../../enums/Status';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to={`/${Status.All}`}
          className={({ isActive }) => (
            classNames({
              selected: isActive,
            })
          )}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to={`/${Status.Active}`}
          className={({ isActive }) => (
            classNames({
              selected: isActive,
            })
          )}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to={`/${Status.Completed}`}
          className={({ isActive }) => (
            classNames({
              selected: isActive,
            })
          )}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
