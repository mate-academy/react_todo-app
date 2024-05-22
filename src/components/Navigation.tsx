import { useContext } from 'react';
import { ToDoContext } from '../store/AppContext';

export const Navigation: React.FC = () => {
  const { dispatch, state } = useContext(ToDoContext);

  const handleFilterAll = () => {
    dispatch({ type: 'FILTER_All' });
  };

  const handleFilterCompleted = () => {
    dispatch({ type: 'FILTER_COMPLETED' });
  };

  const handleFilterActive = () => {
    dispatch({ type: 'FILTER_ACTIVE' });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const toDosLeft = state.todoList.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${toDosLeft.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${state.filter === 'All' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={handleFilterAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${state.filter === 'Active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={handleFilterActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${state.filter === 'Completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterCompleted}
        >
          Completed
        </a>
      </nav>
      <button
        disabled={state.todoList.every(todo => !todo.completed)}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
