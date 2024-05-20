import { Status } from '../../types/Status';

interface FooterProps {
  todoFilter: Status;
  setTodoFilter: (todos: Status) => void;
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  clearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  todoFilter,
  setTodoFilter,
  activeTodosCount,
  hasCompletedTodos,
  clearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${todoFilter === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setTodoFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${todoFilter === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setTodoFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${todoFilter === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setTodoFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
