import { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../types/Status';
import { DispatchContext, StateContext } from './TodosContext';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filterBy } = useContext(StateContext);

  const handelFilter = (filter: Status) => {
    dispatch({
      type: 'filterBy',
      payload: filter,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterBy === Status.All })}
          onClick={() => handelFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterBy === Status.ACTIVE })}
          onClick={() => handelFilter(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterBy === Status.COMPLETED })}
          onClick={() => handelFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
