import { useTodos } from './TodosContext';
export const Footer: React.FC = () => {
  const {
    activeCount,
    completedCount,
    filter,
    setFilter,
    clearCompleted,
    todos,
  } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  return (
    // Footer is hidden when there are no todos
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          onClick={() => setFilter('all')}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          onClick={() => setFilter('active')}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          onClick={() => setFilter('completed')}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
