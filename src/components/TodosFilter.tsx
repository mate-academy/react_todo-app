/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { ActionType, FilterForTodos } from '../utils/enums';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { todofilter } = useContext(StateContext);

  function handlerFilterBy(filter: FilterForTodos) {
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
          className={classNames({ selected: todofilter === FilterForTodos.All })}
          onClick={() => handlerFilterBy(FilterForTodos.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: todofilter === FilterForTodos.Active })}
          onClick={() => handlerFilterBy(FilterForTodos.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: todofilter === FilterForTodos.Completed })}
          onClick={() => handlerFilterBy(FilterForTodos.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
