import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Links } from '../../types/Links';

const filters = [
  { href: Links.ALL, title: 'All' },
  { href: Links.ACTIVE, title: 'Active' },
  { href: Links.COMPLETED, title: 'Completed' },
];

const activeClass = ({ isActive }: { isActive: boolean }) => cn(
  { selected: isActive },
);

const Filters = () => (
  <ul className="filters">
    {filters.map(({ href, title }) => (
      <li key={href}>
        <NavLink
          to={href}
          className={activeClass}
        >
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Filters;
