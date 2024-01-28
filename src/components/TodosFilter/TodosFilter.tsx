import React from 'react';
import cn from 'classnames';

import { Filter } from '../../types/Filter';

interface Props {
  changeFilter: (filter: Filter) => void;
  currentFilter: Filter;
}

export const TodosFilter: React.FC<Props> = (props) => {
  const { changeFilter, currentFilter } = props;

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: currentFilter === Filter.All })}
          onClick={() => changeFilter(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: currentFilter === Filter.Active })}
          onClick={() => changeFilter(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: currentFilter === Filter.Completed })}
          onClick={() => changeFilter(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
