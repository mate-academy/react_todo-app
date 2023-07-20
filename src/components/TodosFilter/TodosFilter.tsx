import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Status } from '../../types/Status';

type Props = {};

const filters = [
  {
    title: 'All',
    url: Status.ALL,
  },
  {
    title: 'Active',
    url: Status.ACTIVE,
  },
  {
    title: 'Completed',
    url: Status.COMPLETED,
  },
];

export const TodosFilter: React.FC<Props> = () => {
  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter.url}>
          <NavLink
            to={filter.url}
            className={({ isActive }) => cn({ selected: isActive })}
          >
            {filter.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
