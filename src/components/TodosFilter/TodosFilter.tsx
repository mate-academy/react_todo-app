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
  const onFilterSelect = (status: Status) => () => {
    setSelectedFilter(status);
  };

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
          onClick={onFilterSelect(Status.All)}
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
          onClick={onFilterSelect(Status.Active)}
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
          onClick={onFilterSelect(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
