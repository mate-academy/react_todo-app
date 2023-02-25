import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';

type Props = {
  completedTodosCount: number;
  activeTodosCount: number;
  deleteTodos: () => void;
};

const FilterLink: FC<{ to: string; title: string }> = ({ to, title }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => classNames({ selected: isActive })}
    >
      {title}
    </NavLink>
  </li>
);

export const TodosFilter: FC<Props> = ({
  completedTodosCount,
  activeTodosCount,
  deleteTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} ${activeTodosCount > 1 ? 'items' : 'item'} left`}
      </span>

      <ul className="filters">
        <FilterLink to="/" title={Status.All} />
        <FilterLink to="/active" title={Status.Active} />
        <FilterLink to="/completed" title={Status.Completed} />
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={deleteTodos}
        style={
          !completedTodosCount ? { visibility: 'hidden' } : { display: 'block' }
        }
      >
        Clear completed
      </button>
    </footer>
  );
};
