import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Status } from '../types/Status';

const filterList = [
  { link: '/', title: Status.ALL },
  { link: '/active', title: Status.ACTIVE },
  { link: '/completed', title: Status.COMPLETED },
];

export const TodosFilter: React.FC = React.memo(() => {
  return (
    <ul className="filters">
      {filterList.map(item => (
        <li key={item.title}>
          <NavLink
            to={item.link}
            className={({ isActive }) => classNames({ selected: isActive })}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
});
