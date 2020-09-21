import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodosFilter = ({
  activeTodos,
  getTodos,
  clearCompleted,
  completedTodos,
  todosStatus,
}) => (
  <>
    <span className="todo-count">
      {`${activeTodos.length}
        ${activeTodos.length !== 1 ? 'items' : 'item'} left`
      }
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: todosStatus === 'all',
          })}
          onClick={() => getTodos('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: todosStatus === 'active',
          })}
          onClick={() => getTodos('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: todosStatus === 'completed',
          })}
          onClick={() => getTodos('completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    {completedTodos.length > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    )}
  </>
);

TodosFilter.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object),
  getTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completedTodos: PropTypes.arrayOf(PropTypes.object),
  todosStatus: PropTypes.string.isRequired,
};

TodosFilter.defaultProps = {
  activeTodos: [],
  completedTodos: [],
};
