/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

import { FilteredBy } from '../types/todo';

interface Props {
  filteredBy: FilteredBy;
  onTodosFilter: (filteredBy: FilteredBy) => void;
}

export const TodosFilter: React.FC<Props> = ({
  filteredBy,
  onTodosFilter,
}) => (
  <ul className="filters" data-cy="todosFilter">
    <li>
      <a
        href="#/"
        className={cn({
          selected: filteredBy === FilteredBy.ALL,
        })}
        onClick={() => onTodosFilter(FilteredBy.ALL)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={cn({
          selected: filteredBy === FilteredBy.ACTIVE,
        })}
        onClick={() => onTodosFilter(FilteredBy.ACTIVE)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={cn({
          selected: filteredBy === FilteredBy.COMPLETED,
        })}
        onClick={() => onTodosFilter(FilteredBy.COMPLETED)}
      >
        Completed
      </a>
    </li>
  </ul>
);
