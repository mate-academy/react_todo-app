import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/StateContext';
import { Filter } from '../types/Filter';
import cn from 'classnames';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filterBy } = useContext(StateContext);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: 'filterBy', payload: Filter.all })}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => dispatch({ type: 'filterBy', payload: Filter.active })}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'filterBy', payload: Filter.completed })
          }
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
