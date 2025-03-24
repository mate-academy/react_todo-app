import React from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

type Props = {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ selected, onSelect }) => {
  const handleSelect = (type: FilterType) => () => {
    onSelect(type);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterType).map(filter => (
        <a
          key={filter}
          href={`#/${filter}`}
          className={classNames('filter__link', {
            selected: selected === filter,
          })}
          data-cy={`FilterLink${filter}`}
          onClick={handleSelect(filter)}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};
