import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store/Store';
import cn from 'classnames';

export const Footer = () => {
  const { todos, useTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {/* Hide the footer if there are no todos */}
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', { selected: useTodos === 'All' })}
              data-cy="FilterLinkAll"
              onClick={() => dispatch({ type: 'setUseTodos', name: 'All' })}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: useTodos === 'Active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => dispatch({ type: 'setUseTodos', name: 'Active' })}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: useTodos === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setUseTodos', name: 'Completed' })
              }
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'clearAll' })}
            disabled={todosLeft === todos.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
