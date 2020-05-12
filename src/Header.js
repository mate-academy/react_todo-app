import React from 'react';
import PropTypes from 'prop-types';
import NewTodo from './NewTodo';

const Header = ({ addNewTodo }) => (
  <>
    <header className="header">
      <h1>todos</h1>
    </header>
    <NewTodo
      addNewTodo={addNewTodo}
    />
  </>
);

Header.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default Header;
