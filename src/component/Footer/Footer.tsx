import React, { useContext, useState } from 'react';
import {
  DispatchContext,
  FilterContext,
  StateContext,
} from '../../ClobalProvaider';
import cn from 'classnames';
import { FilterState } from '../../types/FilterState';

export const Footer: React.FC = () => {
  const [fiterSelect, setFilterSelect] = useState(FilterState.All);
  const { todoList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterState = useContext(FilterContext);
  const listLength = todoList.filter(todo => todo.completed !== true).length;

  const handleFilter = (section: FilterState) => {
    setFilterSelect(section);
    filterState(section);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {listLength} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={cn('filter__link', {
            selected: fiterSelect === FilterState.All,
          })}
          onClick={() => handleFilter(FilterState.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={cn('filter__link', {
            selected: fiterSelect === FilterState.Active,
          })}
          onClick={() => handleFilter(FilterState.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={cn('filter__link', {
            selected: fiterSelect === FilterState.Completed,
          })}
          onClick={() => handleFilter(FilterState.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todoList.some(todo => todo.completed)}
        onClick={() => dispatch({ type: 'deleteCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
