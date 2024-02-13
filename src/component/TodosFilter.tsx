import { useContext } from 'react';
import classNames from 'classnames';
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

  const itemsLeft = `${todos.filter(item => !item.completed).length} items left`;

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {itemsLeft}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: status === Status.All })}
            onClick={() => filterTodos(Status.All)}

          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: status === Status.Active })}
            onClick={() => filterTodos(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: status === Status.Completed })}
            onClick={() => filterTodos(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {filteredTodos.filter(item => item.completed).length > 0 && (
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
