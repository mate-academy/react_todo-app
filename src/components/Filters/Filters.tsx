import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../types/Status';
import { AppContext } from '../AppContext/AppContext';

export const Filters = () => {
  const todoData = useContext(AppContext);

  return (
    <ul className="filters">
      <li>
        <Link
          to="/"
          className={classNames(
            { selected: todoData?.filter === Status.All },
          )}
          onClick={() => todoData?.setFilter(Status.All)}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="/active"
          className={classNames(
            { selected: todoData?.filter === Status.Active },
          )}
          onClick={() => todoData?.setFilter(Status.Active)}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="/completed"
          className={classNames(
            { selected: todoData?.filter === Status.Completed },
          )}
          onClick={() => todoData?.setFilter(Status.Completed)}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
