import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  currentFilter: string;
  onFilterChange?: (filter: string) => void;
};

export const TodosFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange = () => {},
}) => {
  const handleFilter = (filter: string) => () => {
    onFilterChange(filter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Filter.ALL,
          })}
          onClick={handleFilter(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: currentFilter === Filter.ACTIVE,
          })}
          onClick={handleFilter(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: currentFilter === Filter.COMPLETED,
          })}
          onClick={handleFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
