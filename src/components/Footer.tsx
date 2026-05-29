import { useTodos } from '../Context/TodoContext';
import { filters } from '../types/filters';

export const Footer = () => {
  const { state, dispatch } = useTodos();
  const { filter } = state;

  const activeTodosCount = state.todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = state.todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filterOption => (
          <a
            key={filterOption.status}
            href={filterOption.href}
            className={`filter__link ${filterOption.status === filter ? 'selected' : ''}`}
            data-cy={`FilterLink${filterOption.label}`}
            onClick={() =>
              dispatch({
                type: 'setFilter',
                payload: filterOption.status,
              })
            }
          >
            {filterOption.label}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
