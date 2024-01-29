import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, TodosContext } from '../../Store';
import { Status } from '../../types/Status';

const TodosFilter: React.FC = () => {
  const { filterBy } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const filters = (filter: Status) => {
    dispatch({
      type: 'filter',
      payload: filter,
    });
  };

  return (
    <div>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterBy === Status.ALL })}
            onClick={() => filters(Status.ALL)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={cn({ selected: filterBy === Status.ACTIVE })}
            onClick={() => filters(Status.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterBy === Status.COMPLETED })}
            onClick={() => filters(Status.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TodosFilter;
