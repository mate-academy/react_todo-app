import React from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';

interface Props {
  filter: Filter;
  onSelect: (filter: Filter) => void;
}

export const Todosfilter: React.FC<Props> = ({
  filter,
  onSelect,
}) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filter === Filter.ALL,
          })}
          onClick={() => onSelect(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filter === Filter.ACTIVE,
          })}
          onClick={() => onSelect(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filter === Filter.COMPLETED,
          })}
          onClick={() => onSelect(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
