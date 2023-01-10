import React from 'react';
import { Filter } from '../../types/Filters';
import { FilterLink } from '../FilterLink';

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

      <nav className="filter">
        <FilterLink
          to={Filter.All}
          title="All"
        />
        <FilterLink
          to={Filter.Active}
          title="Active"
        />
        <FilterLink
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
