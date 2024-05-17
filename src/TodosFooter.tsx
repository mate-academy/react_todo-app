import { memo } from 'react';
import { useTodos } from './hooks/useTodos';
import classNames from 'classnames';

export const TodosFooter: React.FC = memo(() => {
  const { removeCompletedTodos, setFilter, filter, globalList } = useTodos();

  const listIsNotEmpty = globalList.length > 0;
  const openTodosLength = globalList.filter(todo => !todo.completed).length;
  const completedTodosLength = globalList.filter(todo => todo.completed).length;

  if (!listIsNotEmpty) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${openTodosLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'uncompleted',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('uncompleted')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosLength === 0 ? true : false}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
});

TodosFooter.displayName = 'TodosFooter';
