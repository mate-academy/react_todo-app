import classNames from 'classnames';
import { Status } from '../types/Status';

type Props = {
  filter: Status,
  setFilter: (type: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          onClick={() => setFilter(Status.ALL)}
          className={classNames(
            { selected: filter === Status.ALL },
          )}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames(
            { selected: filter === Status.ACTIVE },
          )}
          onClick={() => setFilter(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames(
            { selected: filter === Status.COMPLETED },
          )}
          onClick={() => setFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
