import { useContext } from 'react';
import { ToDoContext } from '../store/AppContext';
import cn from 'classnames';

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
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: state.filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={handleFilterAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: state.filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: state.filter === 'Completed',
          })}
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
