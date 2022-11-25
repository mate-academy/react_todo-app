import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const TodosFilter: FC = () => {
  const filters = [
    {
      title: 'All',
      link: '/',
    },
    {
      title: 'Active',
      link: '/active',
    },
    {
      title: 'Completed',
      link: '/completed',
    },
  ];

  return (
    <ul className="filters">
      {filters.map(filter => (
        <li key={filter.title}>
          <NavLink
            to={filter.link}
            className={({ isActive }) => classNames({ selected: isActive })}
          >
            {filter.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
