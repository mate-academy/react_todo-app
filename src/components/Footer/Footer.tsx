import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import cn from 'classnames';

export const Footer = () => {
  const { filterTodos } = useContext(StateContext);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleClearCompleted = () => {
    dispatch({ type: 'deleteAllCompleted' });
  };

  const notCompleted = state.todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompleted.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterTodos === 'All' })}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: 'filterTodos', name: 'All' })}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterTodos === 'Active' })}
          data-cy="FilterLinkActive"
          onClick={() => dispatch({ type: 'filterTodos', name: 'Active' })}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterTodos === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => dispatch({ type: 'filterTodos', name: 'Completed' })}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
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
