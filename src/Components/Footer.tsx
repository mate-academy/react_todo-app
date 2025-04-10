import { useTodos } from '../context/TodosContext';
import { FILTERS } from '../types/todo';

export const Footer: React.FC = () => {
  const {
    todos,
    filterType,
    notCompletedTodos,
    handleSelectedTodos,
    handleClearCompleted,
  } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterType === FILTERS.all ? 'selected' : ''} `}
          data-cy="FilterLinkAll"
          onClick={() => handleSelectedTodos('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterType === FILTERS.active ? 'selected' : ''} `}
          data-cy="FilterLinkActive"
          onClick={() => handleSelectedTodos('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterType === FILTERS.completed ? 'selected' : ''} `}
          data-cy="FilterLinkCompleted"
          onClick={() => handleSelectedTodos('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
