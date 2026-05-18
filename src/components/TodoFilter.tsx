import classNames from 'classnames';
import React from 'react';

import { FILTERS, FilterType } from '../constants/filters';

const FILTER_LINKS = [
  {
    type: FILTERS.all,
    href: '#/',
    title: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    type: FILTERS.active,
    href: '#/active',
    title: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: FILTERS.completed,
    href: '#/completed',
    title: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => (
  <nav className="filter" data-cy="Filter">
    {FILTER_LINKS.map(link => (
      <a
        key={link.type}
        href={link.href}
        className={classNames('filter__link', {
          selected: filter === link.type,
        })}
        data-cy={link.dataCy}
        onClick={() => onFilterChange(link.type)}
      >
        {link.title}
      </a>
    ))}
  </nav>
);
