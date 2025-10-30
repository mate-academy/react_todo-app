import { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { state: todos, dispatch, setFilter, filter } = useContext(TodoContext);

  const countOfNotCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed === false);

    return completedTodos.length;
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {countOfNotCompletedTodos()} items left
          </span>

          {/* Active link should have the 'selected' class */}
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
                selected: filter === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('active')}
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

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'clearCompleted' })}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
