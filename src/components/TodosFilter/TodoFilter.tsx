import cn from 'classnames';
import React, { memo, useContext } from 'react';
import { Status } from '../../types/Status';
import { DispatchContext, StateContext } from '../TodosContext';

type Props = {
  filter: Status,
  onFilter: (newFilter: Status) => void,
};

export const TodoFilter: React.FC<Props> = memo(({
  filter,
  onFilter,
}) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleLinkClick
  = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const current = event.currentTarget.href.split('/');

    onFilter(current[current.length - 1] as Status);
  };

  const uncompletedTodosCount = state.reduce((accumulator, todo) => {
    return todo.completed ? 0 : accumulator + 1;
  }, 0);

  const hasSomeCompleted = state.some(todo => todo.completed);

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

      {hasSomeCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'clear' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
