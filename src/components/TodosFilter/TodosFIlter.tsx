import classNames from 'classnames';
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';

type Props = {
  onFilterClick: (status: Status) => void;
  status: Status;
};

export const TodosFilter: React.FC<Props> = React.memo(
  ({ onFilterClick, status }) => {
    return (
      <ul className="filters">
        <li>
          <NavLink
            to="/"
            // eslint-disable-next-line quote-props
            className={classNames('', { 'selected': status === Status.all })}
            onClick={() => onFilterClick(Status.all)}
          >
            All
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/active"
            // eslint-disable-next-line quote-props
            className={classNames('', { 'selected': status === Status.active })}
            onClick={(event) => {
              onFilterClick(Status.active);
              event.preventDefault();
            }}
          >
            Active
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/completed"
            className={classNames('',
              // eslint-disable-next-line quote-props
              { 'selected': status === Status.completed })}
            onClick={() => onFilterClick(Status.completed)}
          >
            Completed
          </NavLink>
        </li>
      </ul>
    );
  },
);
