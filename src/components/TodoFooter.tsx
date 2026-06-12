import React from 'react';
import { useTodos, FilterType } from '../context/TodoContext';

export const TodoFooter: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(filterValue => {
          const title =
            filterValue.charAt(0).toUpperCase() + filterValue.slice(1);

          return (
            <a
              key={filterValue}
              href={filterValue === FilterType.All ? '#/' : `#/${filterValue}`}
              className={`filter__link ${filter === filterValue ? 'selected' : ''}`}
              data-cy={`FilterLink${title}`}
              onClick={() => setFilter(filterValue)}
            >
              {title}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
