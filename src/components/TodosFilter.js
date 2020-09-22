import React from 'react';
import PropTypes from 'prop-types';

export function TodosFilter({
  todoList,
  setTodoList,
  filter,
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
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === 'All' ? 'selected' : ''}
            onClick={() => setFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filter === 'Active' ? 'selected' : ''}
            onClick={() => setFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filter === 'Completed' ? 'selected' : ''}
            onClick={() => setFilter('Completed')}
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
  setFilter: PropTypes.func.isRequired,
};
