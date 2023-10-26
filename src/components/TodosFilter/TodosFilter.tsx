import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../store/store';
import { Status } from '../../types/enums/Status';
import { Dispatchers } from '../../types/enums/Dispatchers';

import './TodosFilter.scss';

interface Props {
  handleSetFilterParam: (param: Status) => void;
  filterParam: Status;
}

const shouldRenderButton = (complited: number, total: number): boolean => {
  if (complited < total) {
    return false;
  }

  return true;
};

export const TodoFilter: React.FC<Props> = ({
  handleSetFilterParam,
  filterParam,
}) => {
  const { state } = useContext(TodosContext);
  const { dispatch } = useContext(TodosContext);

  const count = state.filter(todo => !todo.completed).length;

  const shouldClearButtonRender = shouldRenderButton(count, state.length);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${count} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterParam === Status.All })}
            onClick={() => handleSetFilterParam(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filterParam === Status.Active })}
            onClick={() => handleSetFilterParam(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterParam === Status.Completed })}
            onClick={() => handleSetFilterParam(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {!shouldClearButtonRender
      && (
        <button
          type="button"
          className={cn(
            'clear-completed',
          )}
          onClick={() => dispatch({ type: Dispatchers.DeleteComplited })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
