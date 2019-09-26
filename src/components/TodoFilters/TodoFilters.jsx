import React from 'react';

const TodoFilters = props => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {`${props.todos
        .filter(todo => !todo.checked).length} itmes left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={props.onFilterAll}
          className={props.activeFilter === 'all' ? 'selected' : ''}
        >
              All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={props.onFilterActive}
          className={props.activeFilter === 'active' ? 'selected' : ''}
        >
              Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={props.onFilterComplete}
          className={props.activeFilter === 'complete' ? 'selected' : ''}
        >
              Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={props.todos.some(todo => todo.checked) ? { display: 'block' } : { display: 'none' }}
      onClick={props.onClearCompleted}
    >
              clear completed
    </button>
  </footer>
);

export default TodoFilters;
