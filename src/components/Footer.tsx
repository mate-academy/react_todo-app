import { FC } from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

interface Props {
  countActive: number;
  filter: Filter;
  filterTodos: (filter: Filter) => void;
  clearCompleted: () => void;
  isClearDisable: boolean;
}

export const Footer: FC<Props> = ({
  countActive,
  filter,
  filterTodos,
  clearCompleted,
  isClearDisable,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActive} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => filterTodos('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => filterTodos('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterTodos('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isClearDisable}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
