import React from 'react';

const TodoFilters = ({
  todos,
  onFilterAll,
  activeFilter,
  onFilterComplete,
  onClearCompleted,
  onFilterActive,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {`${todos
        .filter(todo => !todo.checked).length} itmes left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={onFilterAll}
          className={activeFilter === 'all' ? 'selected' : ''}
        >
              All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={onFilterActive}
          className={activeFilter === 'active' ? 'selected' : ''}
        >
              Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={onFilterComplete}
          className={activeFilter === 'complete' ? 'selected' : ''}
        >
              Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={todos.some(todo => todo.checked)
        ? { display: 'block' }
        : { display: 'none' }}
      onClick={onClearCompleted}
    >
              clear completed
    </button>
  </footer>
);

export default TodoFilters;
