import { useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from '../context/TodoContext';
import { Status } from '../types/Status';

export const TodoFilter = () => {
  const {
    todos, setTodos, filterStatus, setFilterStatus,
  } = useContext(TodoContext);

  const handleNewStatus = (status: string) => {
    setFilterStatus(status);
  };

  const handleDeleteCompletedTodo = () => {
    const updatedTodo = todos.filter(todo => !todo.completed);

    setTodos(updatedTodo);
  };

  const showClearButton = todos.some(todo => todo.completed);

  const completedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {completedTodos.length === 1 ? (
          `${completedTodos.length} item left`
        ) : (
          `${completedTodos.length} items left`
        )}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterStatus === Status.All })}
            onClick={() => handleNewStatus(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filterStatus === Status.Active })}
            onClick={() => handleNewStatus(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterStatus === Status.Completed })}
            onClick={() => handleNewStatus(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {showClearButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompletedTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
