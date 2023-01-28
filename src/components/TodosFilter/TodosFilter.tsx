import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';

const filterStatus = Object.values(Status);

export const TodosFilter = () => (
  <ul className="filters" data-cy="todosFilter">
    {filterStatus.map(el => (
      <li key={el}>
        <NavLink
          to={el === 'All' ? '/' : `../${el.toLowerCase()}`}
          className={({ isActive }) => classNames({ selected: isActive })}
        >
          {el}
        </NavLink>
      </li>
    ))}
  </ul>
);
