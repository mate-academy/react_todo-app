import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  changeFilter: (filter: Status) => void;
  filter: Status;
};

export const TodosFilter: React.FC<Props> = ({
  changeFilter,
  filter,
}) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: Status.All === filter,
          })}
          onClick={() => changeFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => changeFilter(Status.Active)}
          className={cn({
            selected: Status.Active === filter,
          })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => changeFilter(Status.Completed)}
          className={cn({
            selected: Status.Completed === filter,
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
