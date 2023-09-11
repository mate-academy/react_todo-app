import React, { useContext } from 'react';
import cn from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';
import { DispatchContext, StateContext } from '../TodosContext/TodosContext';
import { ActionType } from '../../types/ActionType';

type Props = {
  activeLength: number,
  completedLength: number,
  handleClearBtn: () => void,
};

export const Footer: React.FC<Props> = ({
  activeLength,
  completedLength,
  handleClearBtn,
}) => {
  const reducer = useContext(DispatchContext);

  const state = useContext(StateContext);

  const { filter } = state;

  const handleAllBtn = () => {
    reducer({ type: ActionType.SetFilterAll });
  };

  const handleActiveBtn = () => {
    reducer({ type: ActionType.SetFilterActive });
  };

  const handleCompletedBtn = () => {
    reducer({ type: ActionType.SetFilterCompleted });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeLength} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: filter === FilterTypes.all })}
            onClick={handleAllBtn}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filter === FilterTypes.active })}
            onClick={handleActiveBtn}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filter === FilterTypes.completed })}
            onClick={handleCompletedBtn}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedLength > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearBtn}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
