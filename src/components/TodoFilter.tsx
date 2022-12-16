import classNames from 'classnames';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  clearCompletedHandler: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  clearCompletedHandler,
}) => {
  const leftTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = useMemo(() => (
    todos.filter(todo => todo.completed)
  ), [todos]);

  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${leftTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <NavLink to="/" className={isActiveLink}>
            All
          </NavLink>
        </li>

        <li>
          <NavLink to="/active" className={isActiveLink}>
            Active
          </NavLink>
        </li>

        <li>
          <NavLink to="/completed" className={isActiveLink}>
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedHandler}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
