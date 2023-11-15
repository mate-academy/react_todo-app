import cn from 'classnames';
import { useContext, useCallback } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../enums/Status';

type Props = {

};

export const Footer: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    status,
    setStatus,
  } = useContext(TodosContext);

  const clearDoneTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const statusButtonClick
  = useCallback((currentStatus: Status, statusToSet: Status) => {
    if (currentStatus !== statusToSet) {
      setStatus(statusToSet);
    }
  }, [setStatus]);

  return (
    todos.length ? (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cn({ selected: status === Status.All })}
              onClick={() => statusButtonClick(status, Status.All)}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={cn({ selected: status === Status.Active })}
              onClick={() => statusButtonClick(status, Status.Active)}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={cn({ selected: status === Status.Completed })}
              onClick={() => statusButtonClick(status, Status.Completed)}
            >
              Completed
            </a>
          </li>
        </ul>

        {todos.find(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearDoneTodos}
          >
            Clear completed
          </button>
        )}
      </footer>
    ) : <></>);
};
