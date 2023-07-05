import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  currentFilter: Filter;
};

export const TodosFilter: React.FC<Props> = ({ currentFilter }) => {
  return (
    <ul className="filters">
      <li>
        <Link
          to="/"
          className={classNames({ selected: currentFilter === Filter.All })}
        >
          All
        </Link>
      </li>

      <li>
        <Link
          to="/active"
          className={classNames({ selected: currentFilter === Filter.Active })}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="/completed"
          className={
            classNames({ selected: currentFilter === Filter.Completed })
          }
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
