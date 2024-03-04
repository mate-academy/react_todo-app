import React, { useContext } from 'react';
import { Status, TodosContext } from '../../context/TodosContext';

export const TodosFilter: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const completedTodosQuantity = state.todos.filter(
    todo => todo.completed,
  ).length;

  const uncompletedTodosQuantity = state.todos.filter(
    todo => !todo.completed,
  ).length;

  const handleFilterChange = (newFilter: Status) => {
    dispatch({ type: 'setFilter', payload: newFilter });
  };

  return state.todos.length > 0 ? (
    <footer className="footer">
      {uncompletedTodosQuantity > 0 && (
        <span className="todo-count" data-cy="todosCounter">
          {uncompletedTodosQuantity} items left
        </span>
      )}

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={state.filter === Status.All ? 'selected' : ''}
            onClick={() => handleFilterChange(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={state.filter === Status.Active ? 'selected' : ''}
            onClick={() => handleFilterChange(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={state.filter === Status.Completed ? 'selected' : ''}
            onClick={() => handleFilterChange(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodosQuantity > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  ) : null;
};
