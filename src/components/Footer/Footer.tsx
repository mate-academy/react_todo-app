import { FC, useContext, useMemo } from 'react';
import { ShowMode, TodosContext } from '../TodosProvider';
import classNames from 'classnames';

export const Footer: FC = () => {
  const { todos, dispatch, showMode, setShowMode } = useContext(TodosContext);
  const activeTodosCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  if (!todos || !todos.length) {
    return null;
  }

  const handleSetShowMode = (s: ShowMode) => (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMode(s);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: showMode === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={handleSetShowMode('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: showMode === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleSetShowMode('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: showMode === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleSetShowMode('completed')}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'deleteCompleted' })}
        disabled={activeTodosCount === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
