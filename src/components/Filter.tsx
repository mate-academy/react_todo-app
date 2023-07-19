import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from '../utils/types/type';

type Props = {
  todos: Todo [],
  setTodos: (todos: Todo[]) => void,
};

export const Filter:React.FC<Props> = ({ todos, setTodos }) => {
  const itemsLeft = useMemo(() => todos
    .filter(todo => !todo.completed).length, [todos]);
  const hasComleatedItems = todos.length > itemsLeft;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft}   items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="/all"
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

      {hasComleatedItems && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(todos.filter(item => !item.completed))}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
