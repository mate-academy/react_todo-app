import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  filteredBy: FilterBy;
  setFilteredBy: (filterBy: FilterBy) => void;
};

export const TodosFilter: React.FC<Props> = ({ filteredBy, setFilteredBy }) => {
  const onFilterSelect = (filter: FilterBy) => () => {
    setFilteredBy(filter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filteredBy === FilterBy.all })}
          onClick={onFilterSelect(FilterBy.all)}
        >
          {FilterBy.all}
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={cn({ selected: filteredBy === FilterBy.active })}
          onClick={onFilterSelect(FilterBy.active)}
        >
          {FilterBy.active}
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={cn({ selected: filteredBy === FilterBy.completed })}
          onClick={onFilterSelect(FilterBy.completed)}
        >
          {FilterBy.completed}
        </a>
      </li>
    </ul>
  );
};
