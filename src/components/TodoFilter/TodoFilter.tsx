import React from 'react';
import cn from 'classnames';

import { Status } from '../../types/Status';

type Props = {
  sortField: Status,
  setSortField: (status: Status) => void,
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({ sortField, setSortField }) => (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({
            selected: sortField === Status.all,
          })}
          onClick={() => setSortField(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: sortField === Status.active,
          })}
          onClick={() => setSortField(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: sortField === Status.completed,
          })}
          onClick={() => setSortField(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  ),
);
