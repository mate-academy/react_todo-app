import React from 'react';
import classNames from 'classnames';
import { links } from '../../types/constants';
import { useHashFilter } from '../../hooks/useHashFilter';

export const Filter: React.FC = () => {
  const filter = useHashFilter();

  return (
    <nav className="filter" data-cy="Filter">
      {links.map(({ href, type, label }) => (
        <a
          key={type}
          href={href}
          className={classNames('filter__link', {
            selected: filter === type,
          })}
          data-cy={`FilterLink${label}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
