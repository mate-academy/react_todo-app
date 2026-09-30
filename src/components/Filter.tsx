import React from 'react';
import classNames from 'classnames';
import { Filter as FilterType } from '../types/Filter';
import { useTodos } from '../context/TodosContext';

const FILTER_LINKS = [
  { value: FilterType.All, title: 'All', href: '#/', dataCy: 'FilterLinkAll' },
  {
    value: FilterType.Active,
    title: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    value: FilterType.Completed,
    title: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Filter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      {FILTER_LINKS.map(({ value, title, href, dataCy }) => (
        <a
          key={value}
          href={href}
          className={classNames('filter__link', {
            selected: filter === value,
          })}
          data-cy={dataCy}
          onClick={() => setFilter(value)}
        >
          {title}
        </a>
      ))}
    </nav>
  );
};
