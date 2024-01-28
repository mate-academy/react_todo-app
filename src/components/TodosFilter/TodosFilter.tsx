import cn from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { Status } from '../../types/Status';

export const TodosFilter = () => {
  const { filterStatus, setFilterStatus } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href={Status.All}
          className={cn({ selected: filterStatus === Status.All })}
          onClick={() => setFilterStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={Status.Active}
          className={cn({ selected: filterStatus === Status.Active })}
          onClick={() => setFilterStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={Status.Completed}
          className={cn({ selected: filterStatus === Status.Completed })}
          onClick={() => setFilterStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
