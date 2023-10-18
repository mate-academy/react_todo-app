import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  currentFilter: string,
  onFilterChange?: (filter: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange = () => {},
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          className={cn({
            selected: currentFilter === Filter.ALL,
          })}
          href="#/"
          onClick={() => onFilterChange(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          className={cn({
            selected: currentFilter === Filter.ACTIVE,
          })}
          href="#/active"
          onClick={() => onFilterChange(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={cn({
            selected: currentFilter === Filter.COMPLETED,
          })}
          href="#/completed"
          onClick={() => onFilterChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
