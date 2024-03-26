import cn from 'classnames';
import { Status } from './TodosContext';

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodosFilter = ({ filter, setFilter }: Props) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === 'All' ? '#/' : `#/${status.toLowerCase()}`}
            className={cn({ selected: filter === status })}
            onClick={() => setFilter(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
