import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ children, counter, onDeleteAll }) => (
  <footer className="footer">
    <span className="todo-count">
      {`${counter} items left`}
    </span>
    {children}
    <button
      type="button"
      className="clear-completed"
      onClick={() => onDeleteAll()}
    >
        clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  onDeleteAll: PropTypes.func.isRequired,
};
export default Footer;
