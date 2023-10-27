import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filterStatus: Filter
  onFilterChange: (status: Filter) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filterStatus,
  onFilterChange = () => {},
}) => {
  const handleFilterChange = (status: Filter) => () => onFilterChange(status);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterStatus === Filter.ALL })}
          onClick={handleFilterChange(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterStatus === Filter.ACTIVE })}
          onClick={handleFilterChange(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterStatus === Filter.COMPLETED })}
          onClick={handleFilterChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
