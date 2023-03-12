import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FilterCompleted } from '../../types/FilterCompleted';

export const TodosFilter: FC = () => {
  const conditions = [
    {
      link: FilterCompleted.ALL,
      name: 'All',
    },
    {
      link: FilterCompleted.ACTIVE,
      name: 'Active',
    },
    {
      link: FilterCompleted.COMPLETED,
      name: 'Completed',
    },
  ];

  return (
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
};
