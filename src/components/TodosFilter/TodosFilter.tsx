import { useContext } from 'react';
import cn from 'classnames';
import { FilterContext, Status } from '../../store';

export const TodosFilter = () => {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <ul className="filters" data-cy="todosFilter">
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
