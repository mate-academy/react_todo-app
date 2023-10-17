import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../TodosContext';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { todos, setFilterBy, filterBy } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const notCompletedTodos = todos
    .filter(todo => todo.completed === false).length;
  const completedTodos = todos.length - notCompletedTodos;

  const handleClearCompletedTodos = () => {
    dispatch({ type: 'clearCompleted' });
  };

  const handleFilterTodos = (status: Status) => {
    setFilterBy(status);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {notCompletedTodos === 1
          ? '1 item left'
          : `${notCompletedTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filterBy === Status.All })}
            onClick={() => handleFilterTodos(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filterBy === Status.Active })}
            onClick={() => handleFilterTodos(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: filterBy === Status.Completed })}
            onClick={() => handleFilterTodos(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos > 0
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompletedTodos}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
