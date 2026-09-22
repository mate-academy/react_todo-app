import React, { useMemo, useContext, useState } from 'react';
import cn from 'classnames';
import { StateContext, DispatchContext } from '../../context/Store';

import { Filter } from '../../types/Filter';

export const Footer: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const completedTodos = useMemo(() => {
    return state.todos.filter(todo => !todo.completed).length;
  }, [state.todos]);

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);
    dispatch({
      type: 'TODO_FILTER',
      payload: newFilter,
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!state.todos.some(todo => todo.completed)}
        onClick={() => dispatch({ type: 'TODO_CLEAR_COMPLETED' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
