import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  activeTodos: Todo[],
  handleFilterChange: (selectedFilter: Filter) => void,
  handleClearCompleted: () => void,
  filterType: Filter,
  hideClearCompleted: boolean,
};

export const TodoFilter: React.FC<Props> = ({
  activeTodos,
  handleFilterChange,
  handleClearCompleted,
  filterType,
  hideClearCompleted,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodos.length} ${activeTodos.length > 1 ? 'items' : 'item'} left`}
    </span>

    <nav className="filter">
      <a
        role="button"
        href="#/"
        className={classNames(
          'filter__link filter__link__all',
          { selected: filterType === Filter.ALL },
        )}
        onClick={() => handleFilterChange(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link filter__link__active',
          { selected: filterType === Filter.ACTIVE },
        )}
        onClick={() => handleFilterChange(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link filter__link__completed',
          { selected: filterType === Filter.COMPLETED },
        )}
        onClick={() => handleFilterChange(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className={classNames(
        'todoapp__clear-completed clear-completed',
        { 'clear-completed__hide': hideClearCompleted },
      )}
      onClick={handleClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);
