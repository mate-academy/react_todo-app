import React, { useContext } from 'react';
import cn from 'classnames';
import { Filter, filterLinks } from '../../types/Filter';
import { DispatchContext } from '../../Store';

type Props = {
  completedTodosCount: number;
  activeTodosCount: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  focusNewTodoField: () => void;
};

export const Footer: React.FC<Props> = ({
  completedTodosCount,
  activeTodosCount,
  filter,
  onFilterChange,
  focusNewTodoField,
}) => {
  const dispatch = useContext(DispatchContext);

  const handleClearCompleted = () => {
    dispatch({ type: 'clearCompleted' });

    focusNewTodoField();
  };

  const itemsLabel = activeTodosCount === 1 ? 'item' : 'items';

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} ${itemsLabel} left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ value, href, label, dataCy }) => (
          <a
            key={value}
            href={href}
            className={cn('filter__link', { selected: filter === value })}
            data-cy={dataCy}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        disabled={completedTodosCount === 0}
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
