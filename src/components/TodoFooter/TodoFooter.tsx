import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { haveAnyCompletedTodo } from '../../services/todo';
import { Status } from '../../types/Status';

export const TodoFooter: React.FC = () => {
  const {
    todos,
    setTodos,
    filterStatus,
    setFilterStatus,
  } = useContext(TodosContext);

  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearingCompleted = () => {
    setTodos(activeTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filterStatus === Status.All
              ? 'selected'
              : ''}
            onClick={() => setFilterStatus(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filterStatus === Status.Active
              ? 'selected'
              : ''}
            onClick={() => setFilterStatus(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filterStatus === Status.Completed
              ? 'selected'
              : ''}
            onClick={() => setFilterStatus(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {haveAnyCompletedTodo(todos) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearingCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
