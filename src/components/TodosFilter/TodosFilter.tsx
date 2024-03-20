import { useContext } from 'react';
import { DispatchContext, Status, Todo, TodosContext } from '../../store';
import classNames from 'classnames';

export const TodosFilter = () => {
  const { todos, status } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const completed = todos.filter((todo: Todo) => todo.completed);
  const active = todos.filter((todo: Todo) => !todo.completed);

  const handleStatusChange = (newStatus: Status) => {
    dispatch({
      type: 'setStatus',
      payload: newStatus,
    });
  };

  const handleClearAllCompleted = () => {
    completed.forEach((todo: Todo) => {
      dispatch({
        type: 'remove',
        id: todo.id,
      });
    });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {active.length} items left
      </span>

      <ul className="filters">
        <li>
          <a
            href={`#/${Status.All}`}
            className={classNames('', { selected: status === Status.All })}
            onClick={() => handleStatusChange(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Active}`}
            className={classNames('', { selected: status === Status.Active })}
            onClick={() => handleStatusChange(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={`#/${Status.Completed}`}
            className={classNames('', {
              selected: status === Status.Completed,
            })}
            onClick={() => handleStatusChange(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completed.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearAllCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
