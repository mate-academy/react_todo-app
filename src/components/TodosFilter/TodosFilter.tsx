import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { Status } from './Status';

export const TodosFilter: React.FC = () => {
  const { dispatch, setFilter, filterTodos } = useContext(TodoContext);

  const filterTodosByType = (filterType: Status) => {
    setFilter(filterType);
    const filteredTodos = filterTodos(filterType);

    dispatch({ type: 'set_filtered_todos', payload: filteredTodos });
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={() => filterTodosByType(Status.All)}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filterTodosByType(Status.Completed)}
        >
          Completed
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filterTodosByType(Status.Active)}
        >
          Active
        </button>
      </li>
    </ul>
  );
};
