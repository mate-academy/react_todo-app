import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onClearCompleted: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  onClearCompleted,
}) => {
  const completedTodos = todos.filter(todo => todo.completed === true);
  const activeClass = (isActive: boolean) => classNames({
    selected: isActive,
  });

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - completedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={param => activeClass(param.isActive)}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={param => activeClass(param.isActive)}
          >
            Active

          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={param => activeClass(param.isActive)}
          >
            Completed

          </NavLink>
        </li>
      </ul>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
