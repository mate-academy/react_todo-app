import { useContext } from 'react';
import { Status } from '../types/Status';
import { TodosContext } from '../store/TodosContext';

export const TodoFilter = () => {
  const { filter, setFilter } = useContext(TodosContext);

  const handleFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filter === Status.ALL ? 'selected' : ''}
          onClick={() => handleFilterChange(Status.ALL)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={filter === Status.ACTIVE ? 'selected' : ''}
          onClick={() => handleFilterChange(Status.ACTIVE)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={filter === Status.COMPLETED ? 'selected' : ''}
          onClick={() => handleFilterChange(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
