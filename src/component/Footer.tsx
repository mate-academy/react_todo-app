import React from 'react';
import classNames from 'classnames';
import { TodoFilter } from '../type/TodosContexType';
import { Todo } from '../type/Todo';

interface FooterProps {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  clearCompleted: () => void;
  activeTodosCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filter,
  setFilter,
  clearCompleted,
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.values(TodoFilter).map(currentFilter => {
          // Призначаємо лейбли на основі значень фільтру
          const label =
            currentFilter === TodoFilter.All
              ? 'All'
              : currentFilter === TodoFilter.Active
                ? 'Active'
                : 'Completed';

          return (
            <a
              key={currentFilter}
              data-cy={`FilterLink${label}`}
              href={`#${currentFilter === TodoFilter.All ? '' : currentFilter}`}
              className={classNames('filter__link', {
                selected: filter === currentFilter,
              })}
              onClick={() => setFilter(currentFilter)}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={clearCompleted}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear Completed
      </button>
    </footer>
  );
};
