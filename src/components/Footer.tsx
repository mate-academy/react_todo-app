import React from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/types';

type Props = {
  todos: Todo[],
  setTodos: (str: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({ todos, setTodos }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return (isActive ? 'selected' : '');
  };

  const clearCompleted = (ourTodos: Todo[]) => {
    return ourTodos.filter(todo => todo.completed === false);
  };

  const isCompleted = todos.some(todo => todo.completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={getLinkClass}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={getLinkClass}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={getLinkClass}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(clearCompleted(todos))}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
