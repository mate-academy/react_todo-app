import classNames from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  currentPath: string,
}

export const TodoFilter = memo<Props>(({ currentPath }) => (
  <ul className="filters">
    <li>
      <Link
        to="/"
        className={classNames({
          selected: currentPath === '/',
        })}
      >
        All
      </Link>
    </li>

    <li>
      <Link
        to="/active"
        className={classNames({
          selected: currentPath === '/active',
        })}
      >
        Active
      </Link>
    </li>

    <li>
      <Link
        to="/completed"
        className={classNames({
          selected: currentPath === '/completed',
        })}
      >
        Completed
      </Link>
    </li>
  </ul>
));
