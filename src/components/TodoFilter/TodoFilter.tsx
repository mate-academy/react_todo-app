import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Status } from '../../types/Status';

type Props = {
  filterType: Status,
  setFilterType: (value: Status) => void,
};

export const TodoFilter: React.FC<Props> = ({ filterType, setFilterType }) => {
  const onFilterChange = (status: Status) => () => {
    setFilterType(status);
  };

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <Link
          to="/"
          className={classNames({ selected: filterType === Status.All })}
          onClick={onFilterChange(Status.All)}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="/active"
          className={classNames({ selected: filterType === Status.Active })}
          onClick={onFilterChange(Status.Active)}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="/completed"
          className={classNames({ selected: filterType === Status.Completed })}
          onClick={onFilterChange(Status.Completed)}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
