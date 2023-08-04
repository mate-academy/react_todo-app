import { useContext } from 'react';
import classNames from 'classnames';
import { TodoContextDispatch, TodoContextList } from '../Services/TodosContext';
import { ActionTypeEnum, Status } from '../Services/Types';

const filters = [
  { href: '#/', status: Status.All },
  { href: '#/active', status: Status.Active },
  { href: '#/completed', status: Status.Completed },
];

export const TodoFilter: React.FC = () => {
  const { todos, filter } = useContext(TodoContextList);
  const dispatch = useContext(TodoContextDispatch);

  const todosLeft = todos.filter((todo) => !todo.completed);
  const isSomeCompleted = todos.some((todo) => todo.completed);

  const handleFilterChange = (status: Status) => {
    dispatch({
      type: ActionTypeEnum.Filter,
      payload: {
        filterType: status,
      },
    });
  };

  const handleClearAll = () => {
    dispatch({
      type: ActionTypeEnum.ClearCompleted,
      payload: {},
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft.length} items left`}
      </span>

      <ul className="filters">
        {filters.map(({ status, href }) => (
          <li key={status}>
            <a
              href={href}
              className={classNames({ selected: filter === status })}
              onClick={() => handleFilterChange(status)}
            >
              {status}
            </a>
          </li>
        ))}
      </ul>

      {isSomeCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearAll}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
