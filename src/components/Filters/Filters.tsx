import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../types/Status';
import { AppContext } from '../AppContext/AppContext';

export const Filters = () => {
  const todoData = useContext(AppContext);
  const onFilterChange = (status: Status) => () => {
    todoData?.setFilter(status);
  };

  return (
    <ul className="filters">
      <li>
        <Link
          to="/"
          className={classNames(
            { selected: todoData?.filter === Status.All },
          )}
          onClick={onFilterChange(Status.All)}
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
          onClick={onFilterChange(Status.Active)}
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
          onClick={onFilterChange(Status.Completed)}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
