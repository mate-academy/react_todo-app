import { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Status } from '../types/todoTypes';

export const TodoFilter: React.FC = () => {
  const {
    setStatus,
    filteredTodos,
    setTodos,
  } = useContext(TodosContext);
  const [filter, setFilter] = useState<Status>(Status.All);

  const filterTodos = (status: Status) => {
    setStatus(status);
    setFilter(status);
  };

  const clearCompleted = () => {
    const clear = filteredTodos.filter(todo => !todo.completed);

    setTodos(clear);
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${filteredTodos.filter(item => item.completed === false).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === Status.All ? 'selected' : ''}
            onClick={() => filterTodos(Status.All)}

          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filter === Status.Active ? 'selected' : ''}
            onClick={() => filterTodos(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filter === Status.Completed ? 'selected' : ''}
            onClick={() => filterTodos(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {filteredTodos.filter(item => item.completed === true).length > 0 ? (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      ) : null}

    </footer>
  );
};
