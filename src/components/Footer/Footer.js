import React from 'react';
import { FooterProps } from '../PropTypes/PropTypes';

const Footer = ({
  handleFilter, activeFilter, todosList, clearCompleted,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todosList.filter(todo => !todo.completed).length}
        :items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => handleFilter('all')}
          className={activeFilter === 'all' ? 'selected' : ''}
        >
            All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleFilter('active')}
          className={activeFilter === 'active' ? 'selected' : ''}
        >
            Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleFilter('completed')}
          className={activeFilter === 'completed' ? 'selected' : ''}
        >
            Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={clearCompleted}
      style={
        todosList.some(todo => todo.completed)
          ? { display: 'block' }
          : { display: 'none' }
      }
    >
        Clear completed
    </button>
  </footer>
);

Footer.propTypes = FooterProps;
export default Footer;
