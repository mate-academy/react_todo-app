import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/todo';

type Props = {
  onTodoDeleted: (value: boolean) => void
  completedTodos: Todo[],
  todos:Todo[],
};

export const TodosFilter: React.FC<Props> = ({
  onTodoDeleted,
  completedTodos,
  todos,
}) => {
  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames({ selected: isActive });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">

        {todos.length - completedTodos.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <NavLink to="/" className={activeClass}>All</NavLink>
        </li>

        <li>
          <NavLink to="/active" className={activeClass}>Active</NavLink>
        </li>

        <li>
          <NavLink to="/completed" className={activeClass}>Completed</NavLink>
        </li>
      </ul>
      {(completedTodos.length > 0)
          && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => onTodoDeleted(true)}
            >
              Clear completed
            </button>
          ) }
    </footer>
  );
};
