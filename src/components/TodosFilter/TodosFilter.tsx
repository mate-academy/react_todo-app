import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  selectedFilter: string,
  setSelectedFilter: (filter: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({
            selected: selectedFilter === Status.All,
          })}
          onClick={() => setSelectedFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: selectedFilter === Status.Active,
          })}
          onClick={() => setSelectedFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: selectedFilter === Status.Completed,
          })}
          onClick={() => setSelectedFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
