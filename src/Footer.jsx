import React from 'react';

const Footer = ({ length }) => {
  return (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {length} items left
    </span>
    <ul className="filters">
      <li>
        <a href="#/" className="selected">All</a>
      </li>

      <li>
        <a href="#/active">Active</a>
      </li>

      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
    />
  </footer>
  )
}

export default Footer;
