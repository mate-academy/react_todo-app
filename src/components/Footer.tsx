import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';
import { LinksPath } from '../types/LinksPath';

type Props = {
  todos: Todo[],
  setTodos: MakeChange,
  amountCompletedTodos: number,
};

const filterLinks = [{
  title: 'All',
  to: LinksPath.All,
}, {
  title: 'Active',
  to: LinksPath.Active,
}, {
  title: 'Completed',
  to: LinksPath.Completed,
}];

export const Footer: FC<Props> = ({
  todos,
  setTodos,
  amountCompletedTodos,
}) => {
  const hendlerRemoveAll = () => {
    const completedTodos = todos
      .filter(todo => todo.completed === true);

    setTodos.remove(completedTodos.map(({ id }) => id));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - amountCompletedTodos} items left`}
      </span>

      <ul className="filters">
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
