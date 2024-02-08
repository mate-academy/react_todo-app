import cn from 'classnames';
import React, { memo, useContext } from 'react';
import { DispatchContext, StateContext } from '../TodosContext';
import { Status } from '../../types/Status';

type Props = {
  filter: Status,
  onFilterChange: (newFilter: Status) => void,
};

export const TodoFilter: React.FC<Props> = memo(({
  filter,
  onFilterChange,
}) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleLinkClick
  = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const currentPath = e.currentTarget.href.split('/');

    onFilterChange(currentPath[currentPath.length - 1] as Status);
  };

  const uncompletedTodosCount = state.reduce((acc, todo) => {
    return todo.completed ? 0 : acc + 1;
  }, 0);

  const hasCompleted = state.some(todo => todo.completed);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href={`#/${Status.All}`}
            onClick={handleLinkClick}
            className={cn({ selected: filter === Status.All })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Active}`}
            onClick={handleLinkClick}
            className={cn({ selected: filter === Status.Active })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Completed}`}
            onClick={handleLinkClick}
            className={cn({ selected: filter === Status.Completed })}
          >
            Completed
          </a>
        </li>
      </ul>

      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
