import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from './TodoList';

export const Main = props => (
  <section className="main">
    <input
      onChange={props.toogleAllTodosStatus}
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <TodoList
      {...props}
    />
  </section>
);

Main.propTypes = {
  toogleAllTodosStatus: PropTypes.func.isRequired,
};
