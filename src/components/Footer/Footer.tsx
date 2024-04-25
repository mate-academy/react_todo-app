import { useContext } from 'react';
import { ReactContext } from '../../ReactContext';
import cn from 'classnames';

export const Footer = () => {
  const Context = useContext(ReactContext);

  const remainingTodos = Context.todos.filter(todo => !todo.completed);

  const { setFilter } = useContext(ReactContext);

  const deleteCompleted = () => {
    const deleted = Context.todos.filter(todo => !todo.completed);

    Context.setTodoses(deleted);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {remainingTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: Context.filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: Context.filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: Context.filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
