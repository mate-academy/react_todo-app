import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        3 items left
      </span>

      <ul className="filters">
        <li>
          <a href="#" type="button" className="selected">All</a>
        </li>

        <li>
          <a href="#" type="button">Active</a>
        </li>

        <li>
          <a href="#">Completed</a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
      />
    </footer>
  );
};

export default Footer;
