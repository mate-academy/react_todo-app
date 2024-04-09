import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import React, { useContext } from 'react';
import { Filter } from '../types/filter';

export const TodosFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);
  
  const handleSetFilterType = (type: Filter) => () => setFilterType(type);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filterType === Filter.ALL,
          })}
          onClick={handleSetFilterType(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filterType === Filter.ACTIVE,
          })}
          onClick={handleSetFilterType(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filterType === Filter.COMPLETED,
          })}
          onClick={handleSetFilterType(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
