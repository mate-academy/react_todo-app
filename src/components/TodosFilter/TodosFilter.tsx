import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { Status } from './Status';

export const TodosFilter: React.FC = () => {
  const { setFilter, dispatch, state } = useContext(TodoContext);

  const handleFilterChange = (filterType: Status) => {
    setFilter(filterType);
  };

  const handleDeleteComplete = () => {
    dispatch({ type: 'delete_all_complete' });
  };

  const completedTodoLength
    = state.allTodos.filter(todo => todo.completed).length;

  const uncompletedTodos
    = state.allTodos.filter(todo => !todo.completed).length;
  const todoLength = state.allTodos.length;

  return (
    (todoLength > 0) ? (
      <>
        <span className="todo-count" data-cy="todosCounter">
          {`${uncompletedTodos} items left`}
        </span>
        <ul className="filters">
          <li>
            <button
              type="button"
              onClick={() => handleFilterChange(Status.All)}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleFilterChange(Status.Completed)}
            >
              Completed
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleFilterChange(Status.Active)}
            >
              Active
            </button>
          </li>
        </ul>
        {
          !!completedTodoLength && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleDeleteComplete}
            >
              Clear completed
            </button>
          )
        }
      </>
    ) : null
  );
};
