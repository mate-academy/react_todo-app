import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../styles/Todo';

type Props = {
  todos: Todo[],
  deleteCompleted(): void,
};

export const TodoFilter: FC<Props> = ({ todos, deleteCompleted }) => {
  const completedTodos = todos.filter(todo => todo.completed === true);

  const activeClass = (isActive: boolean) => classNames({ selected: isActive });

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
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
