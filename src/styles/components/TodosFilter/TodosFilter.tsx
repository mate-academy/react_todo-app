import { Status, useTodos } from '../../../Store';

export const TodosFilter: React.FC = () => {
  const { setFilter, filter } = useTodos();

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  return (
    <ul className="filters">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === Status.All ? '#/' : `#/${status.toLowerCase()}`}
            className={status === filter ? 'selected' : ''}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
