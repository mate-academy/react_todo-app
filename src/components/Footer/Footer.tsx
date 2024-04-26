/* eslint-disable max-len */
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
  const completed = state.todos.filter(todo => todo.completed === true);

  if (state.todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompleted.length} items left
      </span>

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

      <button
        type="button"
        className={cn('todoapp__clear-completed', {
          disabled: completed.length > 0,
        })}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
