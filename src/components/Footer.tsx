import { Filter } from '../types/types';
import cn from 'classnames';

type Props = {
  leftItem: number;
  filterValues: Filter[];
  filterSelected: Filter;
  setFilterSelected: (filter: Filter) => void;
  disabledButton: boolean;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  leftItem,
  filterValues,
  filterSelected,
  setFilterSelected,
  disabledButton,
  clearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftItem} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filterValues.map(filter => (
          <a
            key={filter}
            href={`#/${filter !== 'all' ? filter : ''}`}
            className={cn('filter__link', {
              selected: filterSelected === filter,
            })}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            onClick={() => setFilterSelected(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={disabledButton}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
