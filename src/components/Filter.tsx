import type { FC, MouseEvent } from 'react';
import classNames from 'classnames';

import { FILTERS, type Filter as FilterType } from '../types/Filter';

interface Props {
  selectedFilter: FilterType;
  onSelect: (filter: FilterType) => void;
}

interface FilterLink {
  filter: FilterType;
  href: string;
  label: string;
  dataCy: string;
}

const filterLinks: FilterLink[] = [
  {
    filter: FILTERS.all,
    href: '#/',
    label: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    filter: FILTERS.active,
    href: '#/active',
    label: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    filter: FILTERS.completed,
    href: '#/completed',
    label: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Filter: FC<Props> = ({ selectedFilter, onSelect }) => {
  const handleFilterClick = (
    event: MouseEvent<HTMLAnchorElement>,
    filter: FilterType,
  ) => {
    event.preventDefault();
    onSelect(filter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {filterLinks.map(({ filter, href, label, dataCy }) => (
        <a
          key={filter}
          href={href}
          className={classNames('filter__link', {
            selected: selectedFilter === filter,
          })}
          data-cy={dataCy}
          onClick={event => handleFilterClick(event, filter)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
