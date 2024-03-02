import classNames from 'classnames';
import React from 'react';
import { Filtering } from '../CustomReducer/useCustomReducer';

interface Props {
  activeFilter: string;
  handleFilter: (arg: Filtering) => void;
}

export const TodosFilter: React.FC<Props> = ({
  activeFilter,
  handleFilter,
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: activeFilter === Filtering.All,
          })}
          onClick={() => handleFilter(Filtering.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: activeFilter === Filtering.Active,
          })}
          onClick={() => handleFilter(Filtering.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: activeFilter === Filtering.Complete,
          })}
          onClick={() => handleFilter(Filtering.Complete)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
