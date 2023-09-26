import { useContext } from 'react';
import classNames from 'classnames';
import { Status, TaskType } from '../../types/TaskType';
import { TodosContext } from '../TodoContext/TodoContext';

type Props = {
  uncompletedTodos: TaskType[],
  handleRemoveAllCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  uncompletedTodos,
  handleRemoveAllCompleted,
}) => {
  const {
    todos,
    filter,
    setFilter,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {
          `${uncompletedTodos.length} items left`
        }
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === Status.ALL,
            })}
            onClick={() => setFilter(Status.ALL)}
          >
            {Status.ALL}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === Status.ACTIVE,
            })}
            onClick={() => setFilter(Status.ACTIVE)}
          >
            {Status.ACTIVE}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === Status.COMPLETED,
            })}
            onClick={() => setFilter(Status.COMPLETED)}
          >
            {Status.COMPLETED}
          </a>
        </li>
      </ul>

      {todos.length - uncompletedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveAllCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
