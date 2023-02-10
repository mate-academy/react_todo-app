import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const TodosFilter: FC = () => {
  const conditions = [
    {
      link: '/',
      name: 'All',
    },
    {
      link: '/active',
      name: 'Active',
    },
    {
      link: '/completed',
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
