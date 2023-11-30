import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  currentFilter: string,
  onFilterChange?: (filter: string) => void
};

export const TodosFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange = () => {},
}) => {
  const handleFilterChange = (newFilter: string) => () => {
    onFilterChange(newFilter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Filter.All,
          })}
          onClick={handleFilterChange(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: currentFilter === Filter.Active,
          })}
          onClick={handleFilterChange(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: currentFilter === Filter.Completed,
          })}
          onClick={handleFilterChange(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
