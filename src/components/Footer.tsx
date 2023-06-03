import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MakeChanges } from '../types/MakeChanges';
import { Todo } from '../types/Todo';
import { LinkPath } from '../types/LinksPath';

type Props = {
  todos: Todo[],
  setTodos: MakeChanges,
  amountCompletedTodos: number,
};

const filterLinks = [{
  title: 'All',
  to: LinkPath.ALL,
}, {
  title: 'Active',
  to: LinkPath.ACTIVE,
}, {
  title: 'Completed',
  to: LinkPath.COMPLETED,
}];

export const Footer: FC<Props> = ({
  todos,
  setTodos,
  amountCompletedTodos,
}) => {
  const hendlerRemoveAll = () => {
    const completedTodos = todos
      .filter(todo => todo.completed);

    setTodos.remove(completedTodos.map(({ id }) => id));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - amountCompletedTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filterLinks.map(({ title, to }) => (
          <li>
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

      {todos.some(todo => todo.completed === true) && (
        <button
          type="button"
          className="clear-completed"
          onClick={hendlerRemoveAll}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
