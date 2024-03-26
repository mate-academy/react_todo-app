import classNames from 'classnames';
import React from 'react';
import { Filter } from '../Types/Filter';

type Props = {
  currentFilter: string;
  onFilterChange?: (filter: string) => void;
};

export const TodosFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange = () => {},
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Filter.ALL,
          })}
          onClick={() => {
            onFilterChange(Filter.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: currentFilter === Filter.ACTIVE,
          })}
          onClick={() => {
            onFilterChange(Filter.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: currentFilter === Filter.COMPLETED,
          })}
          onClick={() => {
            onFilterChange(Filter.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
