import React from 'react';
import PropTypes from 'prop-types';

function TodoFilter({ setFilter, setTodoList, todoList }) {
  return (
    <>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => setFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => setFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => setFilter('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={() => setTodoList(todoList.filter(todo => todo.isActive))}
      >
        Clear completed
      </button>
    </>
  );
}

TodoFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setTodoList: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TodoFilter;
