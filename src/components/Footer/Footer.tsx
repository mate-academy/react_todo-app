import { FC } from 'react';
import classNames from 'classnames';

type Filters = 'All' | 'Active' | 'Completed';
type Props = {
  handleFilterChange: (filterType: Filters) => void;
  filterType: Filters;
  activeTodosCount: number;
  allTodosCount: number;
  clearClompleted: () => void;
};
export const Footer: FC<Props> = ({
  handleFilterChange,
  filterType,
  activeTodosCount,
  allTodosCount,
  clearClompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearClompleted}
        disabled={allTodosCount === activeTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
