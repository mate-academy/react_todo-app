import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FilterTodos = ({ setFilter, clearCompleted, todos, filter }) => (
  <>
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({selected: filter.all})}
          onClick={event => setFilter(event.target.text)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({selected: filter.active})}
          onClick={event => setFilter(event.target.text)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({selected: filter.completed})}
          onClick={event => setFilter(event.target.text)}
        >
          Completed
        </a>
      </li>
    </ul>

    { todos.filter(todo => todo.completed).length
      ? (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      )
      : ''
    }
  </>
);

FilterTodos.propTypes = {
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
  filter: PropTypes.string.isRequired,
};
