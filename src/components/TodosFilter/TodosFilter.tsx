import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { conditions } from '../../utils/conditions';

export const TodosFilter: FC = () => (
  <ul className="filters">
    {conditions.map(condition => (
      <li key={condition.name}>
        <NavLink
          to={condition.link}
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          {condition.name}
        </NavLink>
      </li>
    ))}
  </ul>
);
