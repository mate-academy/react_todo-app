import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status, LinkHref } from '../../types/FilterTypes';

const filterLinks = [
  { name: Status.All, way: LinkHref.All },
  { name: Status.Active, way: LinkHref.Active },
  { name: Status.Completed, way: LinkHref.Completed },
];

export const TodosFilter = () => {
  return (
    <ul className="filters">
      {filterLinks.map(link => {
        const { name, way } = link;

        return (
          <li
            key={name}
          >
            <NavLink
              to={`../${way}`}
              className={({ isActive }) => classNames({ selected: isActive })}
            >
              {name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
