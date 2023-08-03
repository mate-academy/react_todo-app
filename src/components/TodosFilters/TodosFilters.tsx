import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';

export const TodosFilters: React.FC = () => {
  const {
    filterMode,
    setFilterMode,
  } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterMode === 'all' })}
          onClick={() => {
            setFilterMode('all');
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterMode === 'activ' })}
          onClick={() => {
            setFilterMode('activ');
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterMode === 'completed' })}
          onClick={() => {
            setFilterMode('completed');
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
