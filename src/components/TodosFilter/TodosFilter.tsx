import React, { useCallback } from 'react';
import { Status } from '../../types/Status';

type Props = {
  filterStatus: Status;
  setFilterStatus: (newStatus: Status) => void;
};

export const TodosFilter: React.FC<Props> = (
  {
    filterStatus,
    setFilterStatus,
  },
) => {
  const handleFilterStatus = useCallback(
    (event: React.MouseEvent, newStatus: Status) => {
      event.preventDefault();

      setFilterStatus(newStatus);
    }, [filterStatus],
  );

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filterStatus === Status.All
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterStatus === Status.Active
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterStatus === Status.Completed
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
