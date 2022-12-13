import React, { useCallback } from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filterStatus: FilterStatus;
  setFilterStatus: (newStatus: FilterStatus) => void;
};

export const TodosFilter: React.FC<Props> = (
  {
    filterStatus,
    setFilterStatus,
  },
) => {
  const handleFilterStatus = useCallback(
    (event: React.MouseEvent, newStatus: FilterStatus) => {
      event.preventDefault();

      setFilterStatus(newStatus);
    }, [filterStatus],
  );

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filterStatus === FilterStatus.All
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, FilterStatus.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterStatus === FilterStatus.Active
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, FilterStatus.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterStatus === FilterStatus.Completed
            ? 'selected'
            : ''}
          onClick={(event) => handleFilterStatus(event, FilterStatus.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
