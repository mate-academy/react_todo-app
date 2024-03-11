import React from 'react';
import cn from 'classnames';

import { Filter } from '../../type/type';

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filter === Filter.All })}
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filter === Filter.Active })}
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filter === Filter.Completed })}
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodoFilter;
