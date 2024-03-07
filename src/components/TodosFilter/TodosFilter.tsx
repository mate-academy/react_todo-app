import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { DispatchContext, StateContext } from '../../TodosContext';

export const TodosFilter: React.FC = () => {
  const { status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOnClick = useCallback(
    (newFilter: Status) => {
      dispatch({ type: 'filter', payload: newFilter });
    },
    [dispatch],
  );

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: status === Status.All })}
          onClick={() => handleOnClick(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: status === Status.Active })}
          onClick={() => handleOnClick(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={classNames({ selected: status === Status.Completed })}
          href="#/completed"
          onClick={() => handleOnClick(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
