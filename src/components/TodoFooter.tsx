import classNames from 'classnames';
import { useTodos } from '../TodoContext';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoFooter: React.FC<Props> = ({ inputRef }) => {
  const { todos, clearCompleted, filterStatus, setFilterStatus } = useTodos();

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.length - completedTodos.length;

  const handleClearCompleted = () => {
    clearCompleted();
    inputRef?.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
