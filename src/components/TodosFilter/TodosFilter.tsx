import classNames from 'classnames';
import React from 'react';

export const enum FilterStatus {
  All,
  Active,
  Completed,
}

type Props = {
  status: FilterStatus;
  handleStatusChange: (newStatus: FilterStatus) => void;
};

export const TodosFilter: React.FC<Props> = ({
  handleStatusChange,
  status,
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          onClick={() => handleStatusChange(FilterStatus.All)}
          className={classNames({ selected: status === FilterStatus.All })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleStatusChange(FilterStatus.Active)}
          className={classNames({ selected: status === FilterStatus.Active })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleStatusChange(FilterStatus.Completed)}
          className={classNames({
            selected: status === FilterStatus.Completed,
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
