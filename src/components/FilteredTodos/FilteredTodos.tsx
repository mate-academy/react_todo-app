import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterType: FilterType;
  setFilterType: (newType: FilterType) => void;
};

export const TodosFilter: React.FC<Props> = (
  {
    filterType,
    setFilterType,
  },
) => {
  const handleFilterType = useCallback(
    (event: React.MouseEvent, newStatus: FilterType) => {
      event.preventDefault();

      setFilterType(newStatus);
    }, [filterType],
  );

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames('',
            { selected: FilterType.All === filterType })}
          onClick={event => handleFilterType(event, FilterType.All)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={classNames('',
            { selected: FilterType.Active === filterType })}
          onClick={event => handleFilterType(event, FilterType.Active)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={classNames('',
            { selected: FilterType.Completed === filterType })}
          onClick={event => handleFilterType(event, FilterType.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
