import { useContext } from 'react';
import {
  StateContext,
  FILTER_NAMES,
  DispatchContext,
} from '../context/global-context';

export const Footer = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodosCount = state.todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = state.todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} ${activeTodosCount === 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTER_NAMES.map(filterName => (
          <a
            key={filterName}
            href={`#/${filterName === 'all' ? '' : filterName}`}
            className={`filter__link ${state.filter === filterName ? 'selected' : ''}`}
            data-cy={`FilterLink${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`}
            onClick={() => dispatch({ type: 'setFilter', payload: filterName })}
          >
            {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
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
