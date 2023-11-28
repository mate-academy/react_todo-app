import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosFilter: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState<Status>(Status.All);

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  React.useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      switch (filter) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setTodos(filteredTodos);
  }, [filter, todos, setTodos]);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === Status.All ? 'active' : ''}
          onClick={() => handleFilterChange(Status.All)}
        >
          All
        </a>
      </li>
      <li>
        <a href="#/active" onClick={() => handleFilterChange(Status.Active)}>
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          onClick={() => handleFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
