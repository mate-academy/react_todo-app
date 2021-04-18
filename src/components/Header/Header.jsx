import React from 'react';
import PropTypes from 'prop-types';
import { TodoApp } from '../TodoApp';

export const Header = ({ setTodos, todos }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoApp
      setTodos={setTodos}
      todos={todos}
    />
  </header>
);

Header.propTypes = {
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
