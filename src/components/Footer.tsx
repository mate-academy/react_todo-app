import classNames from 'classnames';
import { FC, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { filters } from '../helpers/constants';
import { TodoContext } from '../context/TodoContext';

export const Footer: FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  const hasCompletedTodos = todos.length !== activeTodos.length;

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter.name}>
            <NavLink
              to={filter.link}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {filter.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(activeTodos)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
