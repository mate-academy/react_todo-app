import { useTodoContext } from '../context/TodoContext';

export const Footer = () => {
  const { todos, filter, setFilter, deleteMultipleTodos } = useTodoContext();

  const incompleteTodosCount = todos.filter(
    todo => todo.completed === false,
  ).length;
  const isEveryIncompleted = todos.every(todo => !todo.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          {/* Hide the footer if there are no todos */}
          <span className="todo-count" data-cy="TodosCounter">
            {incompleteTodosCount} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filter === 'All' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => setFilter('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filter === 'Active' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filter === 'Completed' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter('Completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={deleteMultipleTodos}
            disabled={isEveryIncompleted}
            style={{
              cursor: isEveryIncompleted ? 'not-allowed' : 'pointer',
              textDecoration: isEveryIncompleted ? 'none' : '',
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
