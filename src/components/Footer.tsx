import { useContext } from 'react';
import { TodosContext } from '../todosContext';

export const Footer = () => {
  const { todos, filter, setFilter, clearCompleted } = useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const filters = ['All', 'Active', 'Completed'];

  const handleClearCompleted = () => {
    clearCompleted();

    const newTodoField = document.querySelector(
      '[data-cy="NewTodoField"]',
    ) as HTMLInputElement;

    if (newTodoField) {
      newTodoField.focus();
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filterName => {
          const href =
            filterName === 'All' ? '#/' : `#/${filterName.toLowerCase()}`;

          return (
            <a
              key={filterName}
              href={href}
              className={`filter__link ${filter === filterName ? 'selected' : ''}`}
              data-cy={`FilterLink${filterName}`}
              onClick={() => setFilter(filterName)}
            >
              {filterName}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
