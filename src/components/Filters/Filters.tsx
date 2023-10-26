import React from 'react';
import classNames from 'classnames';
import { FilterKey } from '../../types/FilterKey';

type Props = {
  onClick: (key: FilterKey) => void,
  filterKey: FilterKey,
};

export const Filters: React.FC<Props> = ({ onClick, filterKey }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filterKey === FilterKey.All })}
          onClick={() => onClick(FilterKey.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filterKey === FilterKey.Active })}
          onClick={() => onClick(FilterKey.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filterKey === FilterKey.Completed,
          })}
          onClick={() => onClick(FilterKey.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
