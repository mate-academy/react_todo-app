import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../services/Store';
import { Status } from '../types/Status';

export const TodosFilter: React.FC = () => {
  const { setFilter, filter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          onClick={() => {
            setFilter(Status.All);
          }}
          href="#/"
          className={classNames(
            { selected: filter === Status.All },
          )}
        >
          All
        </a>
      </li>

      <li>
        <a
          onClick={() => {
            setFilter(Status.Active);
          }}
          className={classNames(
            { selected: filter === Status.Active },
          )}
          href="#/active"
        >
          Active
        </a>
      </li>

      <li>
        <a
          onClick={() => {
            setFilter(Status.Completed);
          }}
          className={classNames(
            { selected: filter === Status.Completed },
          )}
          href="#/completed"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
