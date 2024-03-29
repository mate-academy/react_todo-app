import cn from 'classnames';
import { Status } from '../../types/types';

type Props = {
  filter: Status;
  onFilter: (status: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ filter, onFilter }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === 'All' ? '#/' : `#/${status}`}
            className={cn({ selected: filter === status })}
            onClick={() => onFilter(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
