import { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../store/store';
import { StatusTodos } from '../../types/StatusTodos';
import { ActionType } from '../../types/ActionType';

import './TodosFilter.scss';

export const TodosFilter = () => {
  const { selectedTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn(
            { selected: selectedTodos === StatusTodos.All },
          )}
          onClick={() => dispatch(
            { type: ActionType.SelectedTodos, payload: StatusTodos.All },
          )}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn(
            { selected: selectedTodos === StatusTodos.Active },
          )}
          onClick={() => dispatch(
            { type: ActionType.SelectedTodos, payload: StatusTodos.Active },
          )}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn(
            { selected: selectedTodos === StatusTodos.Completed },
          )}
          onClick={() => dispatch(
            { type: ActionType.SelectedTodos, payload: StatusTodos.Completed },
          )}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
