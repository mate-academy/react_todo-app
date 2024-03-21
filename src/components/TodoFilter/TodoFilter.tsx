import React from 'react';
import cn from 'classnames';

import { Filter } from '../../type/type';

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const allFilterValues = Object.values(Filter);

  return (
    <ul className="filters" data-cy="todosFilter">
      {allFilterValues.map(currentFilterValue => (
        <li key={currentFilterValue}>
          <a
            href="#/"
            className={cn({ selected: filter === currentFilterValue })}
            onClick={() => setFilter(currentFilterValue)}
          >
            {currentFilterValue}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodoFilter;
