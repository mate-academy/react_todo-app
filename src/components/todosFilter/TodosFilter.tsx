import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/filter.css';
import { FilterStatus } from '../../types/FilterStatus';

export const TodosFilter: React.FC = () => {
  return (
    <>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/${FilterStatus.Active}`}
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/${FilterStatus.Completed}`}
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Completed
          </NavLink>
        </li>
      </ul>
    </>
  );
};
