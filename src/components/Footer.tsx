import { useContext } from 'react';
import { TodosContext } from '../todosContext';

export const Footer = () => {
  const { todos, filter, setFilter, clearCompleted } = useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos.length} items left
      </span>

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

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          clearCompleted();

          const newTodoField = document.querySelector(
            '[data-cy="NewTodoField"]',
          ) as HTMLInputElement;

          if (newTodoField) {
            newTodoField.focus();
          }
        }}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
