import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './Store';
import { getActiveTodos, getCompletedTodos } from '../services/todoUtils';
import { Status } from '../types/Status';

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({ status, onStatusChange }) => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const completedTodos = getCompletedTodos(todos);
  const activeTodos = getActiveTodos(todos);

  const deleteCompletedTodos = () => {
    completedTodos.forEach(todo => {
      dispatch({ type: 'remove', payload: todo.id });
    });
  };

  const handleStatusChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newStatus: Status,
  ) => {
    event.preventDefault();
    onStatusChange(newStatus);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: status === 'All' })}
          data-cy="FilterLinkAll"
          onClick={e => handleStatusChange(e, Status.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={e => handleStatusChange(e, Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => handleStatusChange(e, Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
        onClick={() => deleteCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
