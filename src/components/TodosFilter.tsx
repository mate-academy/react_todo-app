import classNames from 'classnames';
import { Status } from '../enums/Status';

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void;
};

const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(status => (
        <li key={status}>
          <a
            href={status === Status.All ? '#/' : `#/${status.toLowerCase()}`}
            className={classNames({ selected: filter === status })}
            onClick={() => setFilter(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodosFilter;
