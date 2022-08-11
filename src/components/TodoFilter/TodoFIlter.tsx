import classNames from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  pathName: string,
}

export const TodoFilter = memo<Props>(({ pathName }) => {
  // console.log('filter')

  return (
    <ul className="filters">
      <li>
        <Link
          to="/"
          className={classNames({
            selected: pathName === '/',
          })}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="/active"
          className={classNames({
            selected: pathName === '/active',
          })}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="/completed"
          className={classNames({
            selected: pathName === '/completed',
          })}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
});
