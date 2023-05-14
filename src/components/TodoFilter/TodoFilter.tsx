import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const TodoFilter: React.FC = () => {
  const { pathname } = useLocation();

  const filters = [
    { name: 'All', path: '/' },
    { name: 'Active', path: '/active' },
    { name: 'Completed', path: '/completed' },
  ];

  return (
    <ul className="filters">
      {filters.map(filter => (
        <li key={filter.name}>
          <Link
            to={filter.path}
            className={classNames(
              { selected: pathname === filter.path },
            )}
          >
            {filter.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
