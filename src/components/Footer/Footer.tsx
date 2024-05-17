import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

interface FooterProps {
  todos: Todo[];
  filterTodo: Status;
  setFilter: (todos: Status) => void;
  setTodos: (todos: Todo[]) => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filterTodo,
  setFilter,
  setTodos,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterTodo === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterTodo === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterTodo === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.Completed)}
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
