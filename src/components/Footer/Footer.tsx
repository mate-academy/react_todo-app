import { Filter } from '../../types/Filter';
import { useTodoContext } from '../context/TodoContext';

const FILTERS: Record<Filter, string> = {
  All: '#/',
  Active: '#/active',
  Completed: '#/completed',
};

export const Footer = () => {
  const { todos, filter, setFilter, deleteMultipleTodos } = useTodoContext();

  const incompleteTodosCount = todos.filter(todo => !todo.completed).length;
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
            {Object.entries(FILTERS).map(([key, href]) => {
              const currentFilter = key as Filter;

              return (
                <a
                  key={key}
                  href={href}
                  className={`filter__link ${filter === currentFilter ? 'selected' : ''}`}
                  data-cy={`FilterLink${currentFilter}`}
                  onClick={() => setFilter(currentFilter)}
                >
                  {currentFilter}
                </a>
              );
            })}
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
