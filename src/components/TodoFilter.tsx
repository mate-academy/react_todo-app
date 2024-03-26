import { useContext } from 'react';
import { Status } from '../types/Status';
import { TodosContext } from '../store/TodosContext';

export const TodoFilter = () => {
  const { filter, setFilter } = useContext(TodosContext);

  const filters = [
    { status: Status.ALL, text: 'All', href: '#/' },
    { status: Status.ACTIVE, text: 'Active', href: '#/active' },
    { status: Status.COMPLETED, text: 'Completed', href: '#/completed' },
  ];

  const handleFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ status, text, href }) => (
        <li key={status}>
          <a
            className={filter === status ? 'selected' : ''}
            href={href}
            onClick={() => handleFilterChange(status)}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};
