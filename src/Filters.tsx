import classNames from 'classnames';
import React from 'react';
import { Filter } from './types/Filter';

type Props = {
  filterChange: (todoFilter: Filter) => void;
  filter: Filter;
};

export const Filters: React.FC<Props> = ({ filterChange, filter }) => {
  const handleFilter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.id;

    if (target) {
      filterChange(target as Filter);
    }
  };

  return (
    <nav className="filters">
      <a
        id={Filter.All}
        href="#/"
        className={classNames(
          'filters__link',
          { selected: filter === Filter.All },
        )}
        onClick={handleFilter}
      >
        All
      </a>

      <a
        id={Filter.Active}
        href="#/active"
        className={classNames(
          'filters__link',
          { selected: filter === Filter.Active },
        )}
        onClick={handleFilter}
      >
        Active
      </a>

      <a
        id={Filter.Completed}
        href="#/completed"
        className={classNames(
          'filters__link',
          { selected: filter === Filter.Completed },
        )}
        onClick={handleFilter}
      >
        Completed
      </a>
    </nav>
  );
};
