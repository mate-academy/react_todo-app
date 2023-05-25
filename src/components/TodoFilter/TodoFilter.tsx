import classNames from 'classnames';
import './TodoFilter.scss';

export enum FilterTodoStatus {
  ALL,
  COMPLETED,
  ACTIVE,
}

interface Props {
  filter: FilterTodoStatus;
  onFilterChange: (filter: FilterTodoStatus) => void;
}

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterTodoStatus.ALL,
        })}
        onClick={() => {
          onFilterChange(FilterTodoStatus.ALL);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterTodoStatus.ACTIVE,
        })}
        onClick={() => {
          onFilterChange(FilterTodoStatus.ACTIVE);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterTodoStatus.COMPLETED,
        })}
        onClick={() => {
          onFilterChange(FilterTodoStatus.COMPLETED);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
