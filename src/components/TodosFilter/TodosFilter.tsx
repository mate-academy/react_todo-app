import classNames from 'classnames';
import { useContext } from 'react';
import { Status } from '../../types';
import { TodosContext } from '../../TodosContext';

export const TodosFilter: React.FC = () => {
  const { activeFilter, setActiveFilter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: activeFilter === Status.All,
          })}
          onClick={() => setActiveFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: activeFilter === Status.Active,
          })}
          onClick={() => setActiveFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: activeFilter === Status.Completed,
          })}
          onClick={() => setActiveFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
