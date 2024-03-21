import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../services/type-Filter';

export const Footer: React.FC = () => {
  const { todos, setTodos, setFilterType, filterType } =
    useContext(TodosContext);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const findCompleted = todos.some(todo => todo.completed);

  const handleClear = () => {
    setTodos(uncompletedTodos);
  };

  const filterByStatus = (status: Status) => {
    setFilterType(status);
  };

  return (
    <footer className="footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos.length} ${uncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <ul className="filters" data-cy="Filter">
        <li>
          <a
            href="#/"
            className={`filter__link' ${filterType === Status.All ? 'selected' : ''}`}
            onClick={() => filterByStatus(Status.All)}
            data-cy="todosFilter"
          >
            All
          </a>
        </li>

        <li>
          <a
            className={`filter__link ${filterType === Status.Active ? 'selected' : ''}`}
            href="#/active"
            onClick={() => filterByStatus(Status.Active)}
            data-cy="todosFilter"
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={`filter__link' ${filterType === Status.Completed ? 'selected' : ''}`}
            href="#/completed"
            onClick={() => filterByStatus(Status.Completed)}
            data-cy="todosFilter"
          >
            Completed
          </a>
        </li>
      </ul>

      {findCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
          data-cy="clearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
