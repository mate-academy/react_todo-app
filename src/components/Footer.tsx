import { useTodo } from '../context/TodoContext';
import cn from 'classnames';

export const Footer: React.FC = () => {
  const { state, dispatch } = useTodo();

  const countActiveTodos = state.todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = state.todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: state.filter === 'all' })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: state.filter === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: state.filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
