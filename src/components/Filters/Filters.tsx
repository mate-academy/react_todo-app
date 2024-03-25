import classNames from 'classnames';
import { FC, useContext } from 'react';
import { DispatchContext, StateContext } from '../../lib/TodosContext';
import { Status } from '../../type/Status';

export const Filters: FC = () => {
  const dispatch = useContext(DispatchContext);
  const { query } = useContext(StateContext);

  const clickToFilteredTodos = (status: Status) => {
    dispatch({
      type: 'setQuery',
      payload: status,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: query === Status.All,
          })}
          onClick={() => clickToFilteredTodos(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: query === Status.Active,
          })}
          onClick={() => clickToFilteredTodos(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={classNames({
            selected: query === Status.Completed,
          })}
          href="#/completed"
          onClick={() => clickToFilteredTodos(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
