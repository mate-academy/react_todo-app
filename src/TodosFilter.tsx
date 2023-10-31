import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Status } from './types/Status';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    setTodos,
    status,
    setStatus,
  } = useContext(TodosContext);

  const todosCompleted = todos.filter(todo => !todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {todosCompleted.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: status === Status.all,
            })}
            onClick={() => setStatus(Status.all)}
          >
            {Status.all}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: status === Status.active,
            })}
            onClick={() => setStatus(Status.active)}
          >
            {Status.active}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: status === Status.completed,
            })}
            onClick={() => setStatus(Status.completed)}
          >
            {Status.completed}
          </a>
        </li>
      </ul>

      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
