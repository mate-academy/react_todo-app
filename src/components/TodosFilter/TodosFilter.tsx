import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';

type Props = {
  filterBy: Status,
  onChangeFilter: (filterBy: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filterBy,
  onChangeFilter,
}) => {
  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={classNames({ selected: filterBy === Status.ALL })}
          onClick={() => {
            onChangeFilter(Status.ALL);
          }}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={classNames({ selected: filterBy === Status.ACTIVE })}
          onClick={() => {
            onChangeFilter(Status.ACTIVE);
          }}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={classNames({ selected: filterBy === Status.COMPLETED })}
          onClick={() => {
            onChangeFilter(Status.COMPLETED);
          }}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
