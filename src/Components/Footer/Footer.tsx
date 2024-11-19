import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Status } from '../../types/Status';
import cn from 'classnames';
import { completedTodos } from '../../services/services';

export const Footer: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterBy === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: 'setFilterByStatus', payload: Status.All })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'setFilterByStatus', payload: Status.Active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'setFilterByStatus', payload: Status.Completed })
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
        disabled={completedTodos(todos).length === 0}
        onClick={() => dispatch({ type: 'ClearAllCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
