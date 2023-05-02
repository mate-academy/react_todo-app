import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/Todo';

type Props = {
  activeTodos: Todo[],
  completedTodos: Todo[],
  onDelete: (todoId: number) => void,
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  completedTodos,
  onDelete,
}) => {
  const allCompletedTodos = completedTodos.map(completeTodo => completeTodo.id);

  const deleteAllCompletedTodos = () => {
    allCompletedTodos.forEach(todoId => onDelete(todoId));
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} item${activeTodos.length === 1 ? '' : 's'} left `}
      </span>

      <nav className="filter">
        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          All
        </NavLink>

        <NavLink
          to="/active"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          Active
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) => classNames(
            'filter__link',
            { selected: isActive },
          )}
        >
          Completed
        </NavLink>
      </nav>

      <button
        type="button"
        data-cy="deleteTodo"
        className={classNames(
          'todoapp__clear-completed',
          { 'todoapp__clear-completed--hidden': !completedTodos.length },
        )}
        onClick={deleteAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
