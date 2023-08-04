import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';
import { FilterMode } from '../../types/FilterMode';

export const TodosFilters: React.FC = () => {
  const {
    filterMode,
    setFilterMode,
  } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterMode === FilterMode.all })}
          onClick={() => {
            setFilterMode(FilterMode.all);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterMode === FilterMode.active })}
          onClick={() => {
            setFilterMode(FilterMode.active);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterMode === FilterMode.completed })}
          onClick={() => {
            setFilterMode(FilterMode.completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
