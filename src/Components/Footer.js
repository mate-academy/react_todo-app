import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Footer = ({
  todosList,
  filteredTodosList,
  filterField,
  showTodos,
  deleteAllCompleted,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {`${todosList.filter(todo => todo.completed === false)
        .length} `}
      items left
    </span>

    <ul className="filters">
      <li>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#/"
          className={classNames({ selected: filterField === 'all' })}
          onClick={showTodos}
        >
          All
        </a>
      </li>

      <li>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#/active"
          className={classNames({ selected: filterField === 'active' })}
          onClick={() => showTodos('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filterField === 'completed' })}
          onClick={() => showTodos('completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{
        display: filteredTodosList.some(todo => todo.completed === true)
          ? 'block'
          : 'none',
      }}
      onClick={() => deleteAllCompleted(showTodos)}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  filteredTodosList: PropTypes.arrayOf(PropTypes.shape({
    todoTitle: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  })),
  filterField: PropTypes.string,
  showActiveTodos: PropTypes.func,
  showAllTodos: PropTypes.func,
  showCompletedTodos: PropTypes.func,
  deleteAllCompleted: PropTypes.func,
}.isRequired;

export default Footer;
