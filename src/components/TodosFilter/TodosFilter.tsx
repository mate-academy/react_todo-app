import cn from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../todosContext';
import { Status } from '../../types/status';

export const TodosFilter: React.FC = () => {
  const { setQuery, query } = useContext(TodosContext);

  const handleSetQuery = (status: Status) => {
    setQuery(status);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: query === Status.All })}
          onClick={() => handleSetQuery(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: query === Status.Active })}
          onClick={() => handleSetQuery(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleSetQuery(Status.Completed)}
          className={cn({ selected: query === Status.Completed })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
