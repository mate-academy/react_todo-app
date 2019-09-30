import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  todos,
  removeAllCompleteTodos,
  updateActiveTab,
  activeTab,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
      item left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => updateActiveTab('all')}
          className={activeTab === 'all' ? 'selected' : ''}
        >
          All
        </a>
      </li>

      <li>
        <a
          onClick={() => updateActiveTab('active')}
          href="#/active"
          className={activeTab === 'active' ? 'selected' : ''}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => updateActiveTab('completed')}
          className={activeTab === 'completed' ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>

    {todos.some(todo => todo.completed) && (
      <button
        type="button"
        className="clear-completed"
        onClick={removeAllCompleteTodos}
      >
        Clear completed
      </button>
    )}
  </footer>
);

Footer.propTypes = {
  removeAllCompleteTodos: PropTypes.func.isRequired,
  updateActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
