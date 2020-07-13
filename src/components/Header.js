import React from 'react';
import PropTypes from 'prop-types';

import { AddTodo } from './AddTodo';

export const Header = (props) => {
  const { onClick, addTodo } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={onClick}
      />
      <label
        htmlFor="toggle-all"
        title="Mark all as complete"
      >
        Mark all as complete
      </label>

      <AddTodo addTodo={addTodo} />
    </header>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};
