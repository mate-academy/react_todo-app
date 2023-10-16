import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { Status } from '../types';

export const TodosFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter === Status.ALL })}
          onClick={() => setFilter(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter === Status.ACTIVE })}
          onClick={() => setFilter(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter === Status.COMPLETED })}
          onClick={() => setFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
