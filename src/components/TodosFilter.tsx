import cn from 'classnames';
import { useContext } from 'react';
import { Status } from '../types/Status';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: filter === Status.All })}
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filter === Status.Active })}
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filter === Status.Completed })}
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
