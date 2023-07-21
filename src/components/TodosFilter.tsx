import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
}) => {
  const statuses = Object.values(FilterStatus);

  return (
    <ul className="filters" data-cy="todosFilter">
      {statuses.map((status) => (
        <li key={status}>
          <a
            href={`#/${status === 'all' ? '' : status}`}
            onClick={() => setFilterStatus(status)}
            className={classNames({
              selected: status === filterStatus,
            })}
          >
            {status[0].toUpperCase() + status.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};
