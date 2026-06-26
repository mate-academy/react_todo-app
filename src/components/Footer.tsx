// .. Footer.tsx
import { useTodoContext } from '../hooks/useTodoContext';

export const Footer = () => {
  const { todos, clearCompleted, filter, setFilter } = useTodoContext();
  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed === true);

  const handleClearCompleted = () => {
    clearCompleted();

    setTimeout(() => {
      const input = document.querySelector(
        '[data-cy="NewTodoField"]',
      ) as HTMLInputElement;

      if (input) {
        input.focus();
      }
    }, 0);
  };

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodos.length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={
              filter === 'all' ? 'filter__link selected' : 'filter__link'
            }
            data-cy="FilterLinkAll"
            onClick={() => setFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={
              filter === 'active' ? 'filter__link selected' : 'filter__link'
            }
            data-cy="FilterLinkActive"
            onClick={() => setFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={
              filter === 'completed' ? 'filter__link selected' : 'filter__link'
            }
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!hasCompletedTodos}
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
