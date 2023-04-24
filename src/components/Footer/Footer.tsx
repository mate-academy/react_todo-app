import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { filterLinks } from '../../utils/filterLinks';

type Props = {
  completedTodos: Todo[];
  activeTodos: Todo[];
  removeCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  activeTodos, completedTodos, removeCompletedTodos,
}) => {
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
