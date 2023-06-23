import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  onClearCompleted: () => void;
  onFilterChange: (filter: Filter) => void;
  activeFilter: Filter;
};

export const Footer: React.FC<Props> = ({
  todos,
  onClearCompleted,
  onFilterChange,
  activeFilter,
}) => {
  const handleFilterChange = (filter: Filter) => {
    onFilterChange(filter);
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === Filter.All ? 'selected' : ''}
            onClick={() => handleFilterChange(Filter.All)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={activeFilter === Filter.Active ? 'selected' : ''}
            onClick={() => handleFilterChange(Filter.Active)}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={activeFilter === Filter.Completed ? 'selected' : ''}
            onClick={() => handleFilterChange(Filter.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
