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
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: currentFilter === Filter.All,
          })}
          onClick={() => {
            onFilterChange(Filter.All);
          }}
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
          onClick={() => {
            onFilterChange(Filter.Active);
          }}
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
          onClick={() => {
            onFilterChange(Filter.Completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
