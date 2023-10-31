import classNames from 'classnames';
import React from 'react';
import { Filter } from '../types/enum';

type Props = {
  selectedFilter: string;
  setSelectedFilter: (filter: Filter) => void;
};

export const TodosFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames(
            { selected: selectedFilter === Filter.All },
          )}
          onClick={() => setSelectedFilter(Filter.All)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={classNames({ selected: selectedFilter === Filter.Active })}
          onClick={() => setSelectedFilter(Filter.Active)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={classNames(
            { selected: selectedFilter === Filter.Complited },
          )}
          onClick={() => setSelectedFilter(Filter.Complited)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
