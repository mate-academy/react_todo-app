import React from 'react';
import cn from 'classnames';

export const ControlBar = ({
  itemsCount,
  filterByAll,
  filterByCompleted,
  filterByActive,
  filterType,
  clearCompleted
}) => (
  <footer className="footer">
    <span className="todo-count">
      {itemsCount} items left
    </span>

    <ul className="filters">
      <li>
        <a
          onClick={filterByAll}
          className={cn({
            'selected' : filterType === 'All',
          })}>
          All
        </a>
      </li>

      <li>
        <a
          onClick={filterByActive}
          className={cn({
            'selected' : filterType === 'Active',
          })}>
          Active
        </a>
      </li>

      <li>
        <a
          onClick={filterByCompleted}
          className={cn({
            'selected' : filterType === 'Completed',
          })}>
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  </footer>
)
