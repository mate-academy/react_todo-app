import React from 'react';
import PropTypes from 'prop-types';
import { FooterItem } from './FooterItem/FooterItem';

export const Footer = ({ onAll, onActive, onCompleted, onClearAll }) => (
  <footer className="footer">
    <span className="todo-count">
      3 items left
    </span>

    <ul className="filters">
      <FooterItem link="/all" text="all" run={onAll} />
      <FooterItem link="/active" text="active" run={onActive} />
      <FooterItem link="/completed" text="completed" run={onCompleted} />
    </ul>

    <button
      onClick={onClearAll}
      type="button"
      className="clear-completed"
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  onAll: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};
