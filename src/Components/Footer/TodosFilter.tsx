import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import { Status } from '../../Types/Status';
import { Todos } from '../../Types/Todos';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    handleStatus,
    handleDeleteCompleted,
    status,
  } = useContext(TodosContext);

  const activeLength = todos.filter((todo: Todos) => !todo.completed);

  const clearButton = activeLength.length > 0;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeLength.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href={Status.All}
            className={cn({
              selected: status === Status.All,
            })}
            onClick={() => handleStatus(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href={Status.Active}
            className={cn({
              selected: status === Status.Active,
            })}
            onClick={() => handleStatus(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href={Status.Completed}
            className={cn({
              selected: status === Status.Completed,
            })}
            onClick={() => handleStatus(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {clearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
