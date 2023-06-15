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
    <nav className="filters" data-cy="todosFilter">
      <NavLink
        to="/"
        className={classNames('filters__link', {
          selected: filterBy === Status.ALL,
        })}
        onClick={() => {
          onChangeFilter(Status.ALL);
        }}
      >
        All
      </NavLink>

      <NavLink
        to="/active"
        className={classNames('filters__link', {
          selected: filterBy === Status.ACTIVE,
        })}
        onClick={() => {
          onChangeFilter(Status.ACTIVE);
        }}
      >
        Active
      </NavLink>

      <NavLink
        to="/completed"
        className={classNames('filters__link', {
          selected: filterBy === Status.COMPLETED,
        })}
        onClick={() => {
          onChangeFilter(Status.COMPLETED);
        }}
      >
        Completed
      </NavLink>
    </nav>
  );
};
