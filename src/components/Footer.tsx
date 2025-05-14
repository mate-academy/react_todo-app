import React from 'react';
import { useTodos } from '../context/TodosContext';
import { useFilter } from '../context/FilteredTodosContext';

export const Footer: React.FC = () => {
  const { todos, dispatch } = useTodos();
  const { filter, setFilter } = useFilter();

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      <nav className="filter" data-cy="Filter">
        {(['all', 'active', 'completed'] as const).map(f => (
          <a
            key={f}
            href={`#/${f === 'all' ? '' : f}`}
            className={`filter__link ${filter === f ? 'selected' : ''}`}
            data-cy={`FilterLink${f[0].toUpperCase() + f.slice(1)}`}
            onClick={e => {
              e.preventDefault();
              setFilter(f);
            }}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
