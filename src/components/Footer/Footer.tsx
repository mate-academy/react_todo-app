import React from 'react';
import { Filter } from '../../types/Filters';
import { LinkItem } from '../LinkItem';

type Props = {
  itemsLeft: number,
  completedTodos: number,
  handleClearCompletedClick: () => void,
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  completedTodos,
  handleClearCompletedClick,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="nav">
        <LinkItem
          to={Filter.All}
          title="All"
        />
        <LinkItem
          to={Filter.Active}
          title="Active"
        />
        <LinkItem
          to={Filter.Completed}
          title="Completed"
        />
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={completedTodos === 0}
        onClick={handleClearCompletedClick}
      >
        Clear completed
      </button>
    </footer>
  );
};
