import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Active = {
  isActive: boolean
};

enum Status {
  all = '/',
  active = 'active',
  completed = 'completed',
}

export const TodosFilter = () => {
  const getLinkClass = (active: Active) => classNames({
    selected: active.isActive,
  });

  return (
    <ul data-cy="todosFilter" className="filters">
      <li>
        <NavLink to={Status.all} className={getLinkClass}>All</NavLink>
      </li>

      <li>
        <NavLink to={Status.active} className={getLinkClass}>Active</NavLink>
      </li>

      <li>
        <NavLink
          to={Status.completed}
          className={getLinkClass}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
