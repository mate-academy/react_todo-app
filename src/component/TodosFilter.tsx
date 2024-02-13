import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Status } from '../types/todoTypes';

export const TodoFilter: React.FC = () => {
  const {
    status,
    todos,
    setStatus,
    filteredTodos,
    setTodos,
  } = useContext(TodosContext);

  const filterTodos = (s: Status) => {
    setStatus(s);
  };

  const clearCompleted = () => {
    const clear = todos.filter(todo => !todo.completed);

    setTodos(clear);
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(item => !item.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={status === Status.All ? 'selected' : ''}
            onClick={() => filterTodos(Status.All)}

          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={status === Status.Active ? 'selected' : ''}
            onClick={() => filterTodos(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={status === Status.Completed ? 'selected' : ''}
            onClick={() => filterTodos(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {filteredTodos.filter(item => item.completed === true).length > 0 && (
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
