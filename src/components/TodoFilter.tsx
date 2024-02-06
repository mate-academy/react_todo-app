import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const filters = [
    { name: 'All', value: Filter.All },
    { name: 'Active', value: Filter.Active },
    { name: 'Completed', value: Filter.Completed },
  ];

  const onFilterChange = (status: Filter) => () => {
    setFilter(status);
  };

  return (
    <ul className="filters">
      {filters.map((filterItem) => (
        <li key={filterItem.value}>
          <a
            href={`#/${filterItem.value}`}
            className={cn({
              selected: filter === filterItem.value,
            })}
            onClick={onFilterChange(filterItem.value)}
          >
            {filterItem.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
