import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({ status, onStatusChange }) => {
  const { todos, dispatch } = useContext(TodosContext);

  const handleActiveLinkClick = () => {
    if (status !== Status.Active) {
      onStatusChange(Status.Active);
    }
  };

  const handleCompletedLinkClick = () => {
    if (status !== Status.Completed) {
      onStatusChange(Status.Completed);
    }
  };

  const handleAllLinkClick = () => {
    if (status !== Status.All) {
      onStatusChange(Status.All);
    }
  };

  const uncomplitedTodos = useMemo(() => todos
    .filter(({ completed }) => !completed).length, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncomplitedTodos} item${uncomplitedTodos === 1 ? '' : 's'} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href={`#/${status}`}
            className={classNames({
              selected: status === Status.All,
            })}
            onClick={handleAllLinkClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: status === Status.Active,
            })}
            onClick={handleActiveLinkClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: status === Status.Completed,
            })}
            onClick={handleCompletedLinkClick}
          >
            Completed
          </a>
        </li>
      </ul>

      {uncomplitedTodos !== todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: ActionType.DeleteComplited })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
