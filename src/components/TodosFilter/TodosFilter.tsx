import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  filteredBy: FilterBy;
  setFilteredBy: (filterBy: FilterBy) => void;
};

export const TodosFilter: React.FC<Props> = ({ filteredBy, setFilteredBy }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filteredBy === FilterBy.all })}
          onClick={() => setFilteredBy(FilterBy.all)}
        >
          {FilterBy.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filteredBy === FilterBy.active })}
          onClick={() => setFilteredBy(FilterBy.active)}
        >
          {FilterBy.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filteredBy === FilterBy.completed })}
          onClick={() => setFilteredBy(FilterBy.completed)}
        >
          {FilterBy.completed}
        </a>
      </li>
    </ul>
  );
};
