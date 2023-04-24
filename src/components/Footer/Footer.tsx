import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FilterLink } from '../../types/FilterLink';
import { Todo } from '../../types/Todo';

type Props = {
  completedTodos: Todo[];
  activeTodos: Todo[];
  removeCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  activeTodos, completedTodos, removeCompletedTodos,
}) => {
  const filterLinks = [
    {
      to: FilterLink.All,
      name: 'All',
    },
    {
      to: FilterLink.Active,
      name: 'Active',
    },
    {
      to: FilterLink.Completed,
      name: 'Completed',
    },
  ];

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        {filterLinks.map(({ to, name }) => (
          <NavLink
            to={to}
            className={({ isActive }) => classNames('filter__link', {
              selected: isActive,
            })}
          >
            {name}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed',
          { 'is-invisible': !completedTodos.length })}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
