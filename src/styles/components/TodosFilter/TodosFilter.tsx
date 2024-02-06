import classNames from 'classnames';
import { Status, useTodos } from '../../../Store';

export const TodosFilter: React.FC = () => {
  const { setFilter, filter } = useTodos();

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === Status.All ? '#/' : `#/${status.toLowerCase()}`}
            className={classNames({selected: status === filter})}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
