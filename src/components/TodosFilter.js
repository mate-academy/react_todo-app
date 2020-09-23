import React from 'react';
import PropTypes from 'prop-types';

export function TodosFilter({
  todoList,
  setTodoList,
  filter,
  filters,
  setFilter,
}) {
  return (
    <footer
      className="footer"
      hidden={!todoList.length}
    >
      <span className="todo-count">
        {todoList.filter(todo => !todo.completed).length}
        {' '}
        item
        {todoList.filter(todo => !todo.completed).length !== 1 ? 's ' : ' '}
        left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === filters.all ? 'selected' : ''}
            onClick={() => setFilter(filters.all)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filter === filters.active ? 'selected' : ''}
            onClick={() => setFilter(filters.active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filter === filters.completed ? 'selected' : ''}
            onClick={() => setFilter(filters.completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        hidden={todoList.every(todo => !todo.completed)}
        className="clear-completed"
        onClick={() => setTodoList(
          [...todoList.filter(todo => !todo.completed)],
        )}
      >
        Clear completed
      </button>
    </footer>
  );
}

TodosFilter.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodoList: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  filters: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  setFilter: PropTypes.func.isRequired,
};
