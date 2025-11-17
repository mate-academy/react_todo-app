import { useTodo } from '../hooks/useTodo';
import cn from 'classnames';

export const TodoAppFooter: React.FC = () => {
  const { todos, clearSelectTodo, filter, changeFilter } = useTodo();

  const completeTodos = todos.filter(todo => todo.completed);
  const noCompleteTodos = todos.filter(todo => !todo.completed);

  const onAll = () => {
    changeFilter('All');
  };

  const onActive = () => {
    changeFilter('Active');
  };

  const onComleted = () => {
    changeFilter('Completed');
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${noCompleteTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={onAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'Active' })}
          data-cy="FilterLinkActive"
          onClick={onActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={onComleted}
        >
          Completed
        </a>
      </nav>

      <button
        disabled={completeTodos.length === 0}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearSelectTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
