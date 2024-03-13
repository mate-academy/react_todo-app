import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { TodosContext } from '../../Store';

export const TodosFilter: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const handleFilterChange = (status: Status) => {
    dispatch({ type: 'SET_FILTER', payload: status });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: state.filter === Status.All })}
          onClick={() => {
            handleFilterChange(Status.All);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: state.filter === Status.Active,
          })}
          onClick={() => {
            handleFilterChange(Status.Active);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: state.filter === Status.Completed,
          })}
          onClick={() => {
            handleFilterChange(Status.Completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
