import classNames from 'classnames';
import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status,
  setStatus: (status: Status) => void,
};

export const Filter = React.memo(
  ({ status, setStatus }: Props) => {
    return (
      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            classNames('filter__link',
              { selected: status === Status.ALL })
          }
          onClick={() => setStatus(Status.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            classNames('filter__link',
              { selected: status === Status.ACTIVE })
          }
          onClick={() => setStatus(Status.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            classNames('filter__link',
              { selected: status === Status.COMPLETED })
          }
          onClick={() => setStatus(Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>
    );
  },
);
