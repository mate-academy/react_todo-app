/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children, onMarkAllTodo }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={e => onMarkAllTodo(e)}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    {children}
  </section>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  onMarkAllTodo: PropTypes.func.isRequired,
};
export default Main;
