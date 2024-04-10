import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/ReduxContex';
import cn from 'classnames';

export const TodoAppFooter: React.FC = () => {
  const { todos, all, active, complate } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const itemLeft = todos.filter(todo => !todo.complate);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemLeft.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => dispatch({ type: 'filterAll' })}
          href="#/"
          className={cn('filter__link', { selected: all })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => dispatch({ type: 'filterActive' })}
          href="#/active"
          className={cn('filter__link', { selected: active })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => dispatch({ type: 'filterComplate' })}
          href="#/completed"
          className={cn('filter__link', { selected: complate })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        onClick={() => dispatch({ type: 'clearComplate' })}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
