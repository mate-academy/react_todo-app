import React from 'react';
import cn from 'classnames';
import { StatusFilter } from '../../enums/statusFilter';
import { useTodoContext } from '../../store/useTodoContext';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    activeTodosCount,
    statusFilter,
    setStatusFilter,
    isThereAtLeastOneCompletedTodo,
    onClearCompletedTodos,
  } = useTodoContext();

  const getHref = (filter: StatusFilter) => {
    switch (filter) {
      case StatusFilter.All:
        return '#/';
      case StatusFilter.Active:
        return '#/active';
      case StatusFilter.Completed:
        return '#/completed';
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(StatusFilter).map(filter => (
          <a
            key={filter}
            href={getHref(filter)}
            className={cn('filter__link', {
              selected: statusFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => setStatusFilter(filter)}
          >
            {filter[0] + filter.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isThereAtLeastOneCompletedTodo}
        onClick={() => onClearCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
