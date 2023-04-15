import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { LinksPath } from '../../types/LinksPath';
import { Todo } from '../../types/Todo';
import { TodoChanges } from '../../types/TodoChanges';

type Props = {
  completedTodosCounter: number,
  todos: Todo[],
  setTodos: TodoChanges,
};

const links = [{
  title: 'All',
  to: LinksPath.ALL,
}, {
  title: 'Active',
  to: LinksPath.ACTIVE,
}, {
  title: 'Completed',
  to: LinksPath.COMPLETED,
}];

export const Footer: React.FC<Props> = ({
  completedTodosCounter,
  todos,
  setTodos,
}) => {
  const handleRemoveAll = () => {
    const completedTodos = todos.filter(({ completed }) => completed === true);

    setTodos.remove(completedTodos.map(({ id }) => id));
  };

  const isCompleted = todos.some(({ completed }) => completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - completedTodosCounter} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {links.map(({ title, to }) => (
          <li key={title}>
            <NavLink
              to={to}
              className={({ isActive }) => classNames(
                { selected: isActive },
              )}
              replace
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveAll}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
