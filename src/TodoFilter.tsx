import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Filters } from './Filters';

interface PropsTodoFilter {
  setFiltered: (filtered: Filters) => void;
}

export const TodoFilter: FC<PropsTodoFilter> = ({ setFiltered }) => {
  return (

    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => classNames({ selected: isActive })}
          onClick={() => setFiltered(Filters.All)}
        >
          All

        </NavLink>
      </li>

      <li>
        <NavLink
          to="active"
          className={({ isActive }) => classNames({ selected: isActive })}
          onClick={() => setFiltered(Filters.Active)}
        >
          Active

        </NavLink>
      </li>

      <li>
        <NavLink
          to="completed"
          onClick={() => setFiltered(Filters.Completed)}
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          Completed

        </NavLink>
      </li>
    </ul>

  );
};
