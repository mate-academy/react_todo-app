import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const FILTERS = ['All', 'Active', 'Completed'];

export const TodosFilter: React.FC = React.memo(() => {
  const { pathname } = useLocation();

  return (
    <ul className="filters">
      {FILTERS.map(filter => (
        <li
          key={filter}
          className="filters__item"
        >
          <Link
            to={filter === 'All' ? '/' : `/${filter.toLowerCase()}`}
            className={classNames('filters__link', { 'filters__link--active': pathname.toLowerCase().includes(filter.toLowerCase()) || (!pathname.toLowerCase().includes('active') && !pathname.toLowerCase().includes('completed') && filter.toLowerCase() === 'all') })}
          >
            {filter}
          </Link>
        </li>
      ))}
    </ul>
  );
});
