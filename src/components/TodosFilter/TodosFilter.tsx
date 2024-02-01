import { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../TodosContext/TodosContext';
import { ActionTypes, Status } from '../../types/types';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter } = useContext(StateContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filter === Status.All,
          })}
          onClick={
            () => dispatch({
              type: ActionTypes.FilterTodo,
              payload: Status.All,
            })
          }
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={cn({
            selected: filter === Status.Active,
          })}
          onClick={
            () => dispatch({
              type: ActionTypes.FilterTodo,
              payload: Status.Active,
            })
          }
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filter === Status.Completed,
          })}
          onClick={
            () => dispatch({
              type: ActionTypes.FilterTodo,
              payload: Status.Completed,
            })
          }
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
