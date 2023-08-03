import cn from 'classnames';
import { useContext, useState } from 'react';
import { TodosContext } from '../../providers/TodosContext';
import { Status } from '../../utils/status';

export const TodosFilter = () => {
  const { setFilter, todos, deleteAllTodos } = useContext(TodosContext);
  const [selectFiler, setSelectFilter] = useState(Status.All);
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  const handlerFiler = (filter: Status) => {
    setSelectFilter(filter);
    setFilter(filter);
  };

  return todos.length > 0 ? (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActiveTodos}
        item${countActiveTodos !== 1 ? 's' : ''} left`}
      </span>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn(selectFiler === Status.All ? 'selected' : '')}
            onClick={() => handlerFiler(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn(selectFiler === Status.Active ? 'selected' : '')}
            onClick={() => handlerFiler(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn(selectFiler === Status.Completed ? 'selected' : '')}
            onClick={() => handlerFiler(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {countCompletedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteAllTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  ) : null;
};
