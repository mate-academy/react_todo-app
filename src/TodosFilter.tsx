import { useContext } from 'react';
import { Status } from './types/Todo';
import { TodosContext } from './TodosContext';

export const TodosFilter = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map((status) => (
        <li key={status}>
          <a
            href={`#/${status === Status.ALL ? '' : status.toLowerCase()}`}
            className={filter === status ? 'selected' : ''}
            onClick={() => setFilter(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
