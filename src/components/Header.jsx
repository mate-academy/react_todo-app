import React from 'react';
import PropTypes from 'prop-types';
import NewTodo from './NewTodo';

const Header = ({ addTodo, todos }) => (
  <header className="header">
    <h1>todos</h1>

    <NewTodo
      onSubmit={addTodo}
      todos={todos}
    />

  </header>
);

Header.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  })).isRequired,
  addTodo: PropTypes.func,
};

Header.defaultProps = {
  addTodo: () => {},
};

export default Header;
