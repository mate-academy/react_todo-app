import React from 'react';
import classNames from 'classnames';
import { SortBy } from '../../types/SortBy';

type Props = {
  sortBy: string,
  setSortBy: (sort: SortBy) => void;
}

export const TodosFilter: React.FC<Props> = ({ sortBy, setSortBy }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={classNames(
          { selected: sortBy === SortBy.All },
        )}
        onClick={() => setSortBy(SortBy.All)}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames(
          { selected: sortBy === SortBy.Active },
        )}
        onClick={() => setSortBy(SortBy.Active)}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames(
          { selected: sortBy === SortBy.Completed },
        )}
        onClick={() => setSortBy(SortBy.Completed)}
      >
        Completed
      </button>
    </li>
  </ul>
);
