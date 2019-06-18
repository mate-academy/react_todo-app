import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        <strong>3</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button className="clear-completed" style={{ display: 'block' }}></button>
    </footer>
  );
};

export default Footer;
