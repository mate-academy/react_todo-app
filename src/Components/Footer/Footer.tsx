import { useContext } from 'react';
import cn from 'classnames';

import { TodoContext } from '../../Context/TodoContext';

export const Footer: React.FC = () => {
  const { setFilterBy, filterBy, todos, deleteCompletedTodos } =
    useContext(TodoContext);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', { selected: filterBy === 'all' })}
            data-cy="FilterLinkAll"
            onClick={() => setFilterBy('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filterBy === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => setFilterBy('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filterBy === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilterBy('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={deleteCompletedTodos}
          disabled={!hasCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
