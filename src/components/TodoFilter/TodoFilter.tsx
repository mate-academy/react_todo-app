import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../TodoProvider';
import { Filter } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => setFilterType(Filter.ALL)}
          className={classNames({ selected: filterType === Filter.ALL })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilterType(Filter.ACTIVE)}
          className={classNames({ selected: filterType === Filter.ACTIVE })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilterType(Filter.COMPLETED)}
          className={classNames({ selected: filterType === Filter.COMPLETED })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
