import { useContext, useState } from 'react';
import { TodosContext } from '../../providers/TodosContext';
import { Status } from '../../utils/status';

export const TodosFilter = () => {
  const { setFilter, todos, deleteTodo } = useContext(TodosContext);
  const [selectFiler, setSelectFilter] = useState(Status.All);
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  const handlerFiler = (filter: Status) => {
    setSelectFilter(filter);
    setFilter(filter);
  };

  const clearAllCompleted = () => {
    const todosIds = todos.filter(todo => todo.completed).map(todo => todo.id);

    todosIds.forEach(id => {
      deleteTodo(id);
    });
  };

  return (
    <>
      {todos.length > 0
    && (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${countActiveTodos}
          item${countActiveTodos !== 1 ? 's' : ''} left`}
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={selectFiler === Status.All ? 'selected' : ''}
              onClick={() => handlerFiler(Status.All)}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={selectFiler === Status.Active ? 'selected' : ''}
              onClick={() => handlerFiler(Status.Active)}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={selectFiler === Status.Completed ? 'selected' : ''}
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
            onClick={clearAllCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    )}
    </>
  );
};
