import classNames from 'classnames';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../types/Status';

type Props = {
  filter: Status,
  setFilter: (arg: Status) => void,
};

export const Filters: React.FC<Props> = ({
  filter,
  setFilter,
}) => {
  const onFilterChange = useCallback((status: Status) => () => {
    setFilter(status);
  }, []);

  return (
    <ul className="filters">
      <li>
        <Link
          to="/"
          className={classNames(
            { selected: filter === Status.All },
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
            { selected: filter === Status.Active },
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
            { selected: filter === Status.Completed },
          )}
          onClick={onFilterChange(Status.Completed)}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
