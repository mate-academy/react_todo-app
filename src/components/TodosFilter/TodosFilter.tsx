import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../../types/FilterType';

type Props = {
  activeTodosAmount: number,
  completedTodosAmount: number,
  onFilterTodos: (arg: FilterType) => void,
  onClearCompletedTodos: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  activeTodosAmount,
  completedTodosAmount,
  onFilterTodos,
  onClearCompletedTodos,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {activeTodosAmount === 1
        ? '1 item left'
        : `${activeTodosAmount} items left`}
    </span>

    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          onClick={() => onFilterTodos(FilterType.ALL)}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          onClick={() => onFilterTodos(FilterType.ACTIVE)}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          onClick={() => onFilterTodos(FilterType.COMPLETED)}
        >
          Completed
        </NavLink>
      </li>
    </ul>

    {completedTodosAmount > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </footer>
);
