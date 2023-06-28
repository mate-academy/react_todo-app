import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from './react-app-env';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosFilter: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${[...todos.filter(todo => !todo.completed)].length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => classNames({ selected: isActive })}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            className={({ isActive }) => classNames({ selected: isActive })}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) => classNames({ selected: isActive })}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {todos.filter(todo => todo.completed).length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            setTodos(todos.filter(todo => !todo.completed));
          }}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
