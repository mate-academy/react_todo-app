import React, { useContext } from 'react';
import cn from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';
import { DispatchContext, StateContext } from '../TodosContext/TodosContext';

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
    reducer({ type: 'setFilterAll' });
  };

  const handleActiveBtn = () => {
    reducer({ type: 'setFilterActive' });
  };

  const handleCompletedBtn = () => {
    reducer({ type: 'setFilterCompleted' });
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
            className={cn(filter === FilterTypes.all ? 'selected' : '')}
            onClick={handleAllBtn}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn(filter === FilterTypes.active ? 'selected' : '')}
            onClick={handleActiveBtn}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn(filter === FilterTypes.completed ? 'selected' : '')}
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
