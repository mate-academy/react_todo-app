import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './TodoFilter.scss';

import TodoStatus from '../../enums/TodoStatus';

export const TodoFilter: React.FC = () => {
  return (
    <ul className="TodoFilter">
      {Object.entries(TodoStatus).map(([status, link]) => (
        <li key={status} className="TodoFilter-Item">
          <NavLink
            to={`/${link}`}
            className={({ isActive }) => (
              classNames({
                'TodoFilter-Link': true,
                'TodoFilter-Link_selected': isActive,
              })
            )}
          >
            {status}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
