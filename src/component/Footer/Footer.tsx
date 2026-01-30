import React, { useContext, useState } from 'react';
import { Filter } from '../../types/Filter';
import cn from 'classnames';
import {
  DispatchContext,
  FilterContext,
  StateContext,
  ActionType,
} from '../../GlobalProvider';

export const Footer: React.FC = () => {
  const [filterSelect, setFilterSelect] = useState(Filter.ALL);
  const { todoList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterState = useContext(FilterContext);
  const listLength = todoList.filter(todo => todo.completed !== true).length;

  const handleFilter = (section: Filter) => {
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
          className={cn('filter__link', {
            selected: filterSelect === Filter.ALL,
          })}
          onClick={() => handleFilter(Filter.ALL)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterSelect === Filter.ACTIVE,
          })}
          onClick={() => handleFilter(Filter.ACTIVE)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterSelect === Filter.COMPLETED,
          })}
          onClick={() => handleFilter(Filter.COMPLETED)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todoList.some(todo => todo.completed)}
        onClick={() => dispatch({ type: ActionType.DELETE_COMPLETED })}
      >
        Clear completed
      </button>
    </footer>
  );
};
