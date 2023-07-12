import classNames from 'classnames';
import { Todo } from '../types/Todo';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[];
  todosStatus: Status;
  setTodosStatus: (todosStatus: Status) => void;
  onClearCompleted: () => void;
};

export const ToDoFooter: React.FC<Props> = ({
  todos,
  setTodosStatus,
  todosStatus,
  onClearCompleted,
}) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  const handleStatusChange = (
    status: Status,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setTodosStatus(status);
  };

  const handleClearCompleted = () => {
    onClearCompleted();
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${activeTodos.length} items left`}</span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: todosStatus === Status.All,
          })}
          onClick={(event) => handleStatusChange(Status.All, event)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: todosStatus === Status.Active,
          })}
          onClick={(event) => handleStatusChange(Status.Active, event)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: todosStatus === Status.Completed,
          })}
          onClick={(event) => handleStatusChange(Status.Completed, event)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        data-cy="ClearCompletedButton"
        className="todoapp__clear-completed"
        style={{
          visibility: completedTodos.length ? 'visible' : 'hidden',
        }}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
