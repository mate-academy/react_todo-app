import { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../types/Status';
import { DispatchContext, StateContext } from './TodosContext';

export const TodosFilter = () => {
  const { filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const chooseFilter = (filter: Status) => {
    dispatch({
      type: 'filter',
      payload: filter,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterBy === Status.ALL })}
          onClick={() => chooseFilter(Status.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterBy === Status.ACTIVE })}
          onClick={() => chooseFilter(Status.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterBy === Status.COMPLETED })}
          onClick={() => chooseFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
