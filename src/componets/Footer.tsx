import { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';

export const Footer = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filter } = useParams();

  const activeTodos = todos.filter(todo => todo.completed === false);

  const completedTodos = todos.filter(todo => todo.completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            to="../"
            className={classNames('completed',
              { selected: !filter })}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="../active"
            className={classNames('completed',
              { selected: filter === 'active' })}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="../completed"
            className={classNames('completed',
              { selected: filter === 'completed' })}
          >
            Completed
          </NavLink>
        </li>
      </ul>

      {completedTodos.length > 0
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => {
              setTodos(activeTodos);
            }}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
