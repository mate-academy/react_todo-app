import React from 'react';

import { Filter } from '../../type/type';

interface Props {
  setFilter: (filter: Filter) => void;
}

const TodoFilter: React.FC<Props> = ({ setFilter }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a href="#/" className="selected" onClick={() => setFilter(Filter.All)}>
          All
        </a>
      </li>

      <li>
        <a href="#/active" onClick={() => setFilter(Filter.Active)}>
          Active
        </a>
      </li>

      <li>
        <a href="#/completed" onClick={() => setFilter(Filter.Completed)}>
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodoFilter;
