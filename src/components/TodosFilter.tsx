import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

interface Props {
  filter: Filter;
  setFilter: (query: Filter) => void;
}

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const onFilterChange = (query: Filter) => {
    setFilter(query);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filter === Filter.All,
          })}
          onClick={() => onFilterChange(Filter.All)}
        >
          All
        </a>

      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filter === Filter.Active,
          })}
          onClick={() => onFilterChange(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filter === Filter.Completed,
          })}
          onClick={() => onFilterChange(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
