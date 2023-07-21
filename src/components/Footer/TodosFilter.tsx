import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status, LinkHref } from '../../types/FilterTypes';

const filterLinks = [
  { name: Status.ALL, way: LinkHref.ALL },
  { name: Status.ACTIVE, way: LinkHref.ACTIVE },
  { name: Status.COMPLETED, way: LinkHref.COMPLETED },
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
