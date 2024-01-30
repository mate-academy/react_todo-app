/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { ActionType, TodoFilterType } from '../utils/enums';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { todofilter } = useContext(StateContext);

  function handlerFilterBy(filter: TodoFilterType) {
    dispatch({ type: ActionType.FilterBy, payload: filter });
  }

  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({ selected: todofilter === TodoFilterType.All })}
          onClick={() => handlerFilterBy(TodoFilterType.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: todofilter === TodoFilterType.Active })}
          onClick={() => handlerFilterBy(TodoFilterType.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: todofilter === TodoFilterType.Completed })}
          onClick={() => handlerFilterBy(TodoFilterType.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
