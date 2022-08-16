import classNames from 'classnames';
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from './Context';
import { Todo } from '../types/Todo';

export const Filters: React.FC = () => {
  const { todos, setTodos } = useContext(Context);
  const [shouldClearCompleted, setClearCompleted] = useState(true);
  let activeTodos: Todo[] = [];
  let completedTodos: Todo[] = [];

  if (todos.length) {
    activeTodos = todos.filter((todo: Todo) => todo.completed !== true);
    completedTodos = todos.filter((todo: Todo) => todo.completed === true);
  }

  useEffect(() => {
    if (activeTodos) {
      setTodos(activeTodos);
    }

    if (activeTodos) {
      setTodos(activeTodos);
    }

    setClearCompleted(true);
  }, [shouldClearCompleted]);

  const selectedClass = (isActive: boolean) => {
    return (classNames({
      selected: isActive,
    }));
  };

  return (
    <footer className="footer">
      {typeof activeTodos !== 'undefined' && (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos?.length || 0} items left`}
        </span>
      )}

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => selectedClass(isActive)}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={({ isActive }) => selectedClass(isActive)}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) => selectedClass(isActive)}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodos.length > 0 && shouldClearCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setClearCompleted(false)}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
