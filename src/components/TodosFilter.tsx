import { useContext } from 'react';
import { FilterContext } from '../contexts/FilterContext';
import { Status } from '../enums/status';

export const TodosFilter: React.FC = () => {
  const { status, setStatus } = useContext(FilterContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href={Status.all}
          className={status === Status.all ? 'selected' : ''}
          onClick={() => setStatus(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={Status.active}
          className={status === Status.active ? 'selected' : ''}
          onClick={() => setStatus(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={Status.completed}
          className={status === Status.completed ? 'selected' : ''}
          onClick={() => setStatus(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
