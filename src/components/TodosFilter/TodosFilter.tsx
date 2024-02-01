import cn from 'classnames';

import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../styles/types';

export const TodosFilter: React.FC = () => {
  const { setStatus, status } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: status === Status.All })}
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: status === Status.Active })}
          onClick={() => setStatus(Status.Active)}

        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: status === Status.Completed })}
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
