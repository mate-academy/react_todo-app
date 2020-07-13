import React from 'react';
import { FilterItem } from './FilterItem';

export function FiltersList() {
  const filtersTypes = ['All', 'Active', 'Completed'];

  return (
    <>
      <ul className="filters">
        {filtersTypes.map(filter => (
          <FilterItem filterName={filter} key={filter} />
        ))}
      </ul>
    </>
  );
}
