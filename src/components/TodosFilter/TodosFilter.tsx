import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import TodoStatus from '../../enums/TodoStatus';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters">
      {Object.entries(TodoStatus).map(([name, link]) => (
        <li key={name}>
          <NavLink
            to={`/${link}`}
            className={({ isActive }) => (
              classNames({
                selected: isActive,
              })
            )}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
