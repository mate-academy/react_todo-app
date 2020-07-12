import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';

export const Main = props => (
  <section className="main">
    <input
      className="toggle-all"
      id="toggle-all"
      type="checkbox"
      onChange={props.isAllTodoToggle}
    />
    <label htmlFor="toggle-all">All complete</label>
    <TodoList
      {...props}
    />
  </section>
);

Main.propTypes = {
  isAllTodoToggle: PropTypes.func.isRequired,
};
