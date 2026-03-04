import cn from 'classnames';
import React from 'react';
import { SortType } from '../../types/sortField';
import { filterItems } from '../../utils/filterItems';
import { useFilter } from '../../context/FilterContext';

export const Filter: React.FC = () => {
  const { field: sortField, onFilter: handleFilter } = useFilter();

  return (
    <nav className="filter" data-cy="Filter">
      {filterItems.map(filterItem => (
        <a
          key={filterItem.field}
          href={`#/${filterItem.field === SortType.default ? '' : filterItem.field}`}
          className={cn('filter__link', {
            selected: sortField === filterItem.field,
          })}
          data-cy={filterItem.dataCy}
          onClick={() => handleFilter(filterItem.field)}
        >
          {filterItem.label}
        </a>
      ))}
    </nav>
  );
};
