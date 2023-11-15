import cn from 'classnames';
import { useCallback, useContext } from 'react';
import { Status } from '../../enums/Status';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  status: Status,
};

export const TodosFilter: React.FC<Props> = ({ status }) => {
  const { setStatus } = useContext(TodosContext);

  const statusButtonClick
  = useCallback((currentStatus: Status, statusToSet: Status) => {
    if (currentStatus !== statusToSet) {
      setStatus(statusToSet);
    }
  }, [setStatus]);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: status === Status.All })}
          onClick={() => statusButtonClick(status, Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: status === Status.Active })}
          onClick={() => statusButtonClick(status, Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: status === Status.Completed })}
          onClick={() => statusButtonClick(status, Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
