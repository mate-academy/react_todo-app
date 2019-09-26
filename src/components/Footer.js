import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  updateTodoToShow, todosToShow, removeAllCompleteTodos, preparedtTodos, todos,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todosToShow === 'completed'
        ? todos.filter(todo => !todo.complete).length
        : preparedtTodos.filter(todo => !todo.complete).length}
      {' '}
        items left
    </span>

    <ul className="filters">
      <li>
        <a
          onClick={() => updateTodoToShow('all')}
          href="#/"
          className={todosToShow === 'all' ? 'selected' : ''}
        >
            All
        </a>
      </li>

      <li>
        <a
          onClick={() => updateTodoToShow('active')}
          href="#/active"
          className={todosToShow === 'active' ? 'selected' : ''}
        >
            Active
        </a>
      </li>

      <li>
        <a
          onClick={() => updateTodoToShow('completed')}
          href="#/completed"
          className={todosToShow === 'completed' ? 'selected' : ''}
        >
            Completed
        </a>
      </li>
    </ul>

    {preparedtTodos.some(todo => todo.complete)
        && (
          <button
            onClick={removeAllCompleteTodos}
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          >
            {' '}
            Clear completed
          </button>
        )
    }
  </footer>
);

Footer.propTypes = {
  removeAllCompleteTodos: PropTypes.func.isRequired,
  updateTodoToShow: PropTypes.func.isRequired,
  todosToShow: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  preparedtTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
