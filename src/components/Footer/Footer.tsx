import React, { useContext } from 'react';
import cn from 'classnames';

import { DispatchContex, StateContex } from '../../Store';
import { Filter } from '../../types/Filter';

export const Footer: React.FC = () => {
  const { todos, filter } = useContext(StateContex);
  const dispatch = useContext(DispatchContex);

  const isAvailabilityCompleted = !todos.filter(todo => todo.completed).length;

  const countTodosLeft = todos.filter(t => !t.completed).length;

  const handlerClearCompleted = () => {
    todos.forEach(({ id, completed }) => {
      if (completed) {
        dispatch({ type: 'remove', payload: id });
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filter.ALL })}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: 'set-filter', payload: Filter.ALL })}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === Filter.ACTIVE })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'set-filter', payload: Filter.ACTIVE })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'set-filter', payload: Filter.COMPLETED })
          }
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handlerClearCompleted}
        disabled={isAvailabilityCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
