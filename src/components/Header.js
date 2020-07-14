import React from 'react';
import PropTypes from 'prop-types';

import { AddTodo } from './AddTodo';

export const Header = (props) => {
  const { addTodo, isChecked, onChange } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={onChange}
        checked={isChecked}
      />
      <label
        htmlFor="toggle-all"
        title={isChecked
          ? 'Mark all as active'
          : 'Mark all as complete'
        }
      >
        Mark all
      </label>

      <AddTodo addTodo={addTodo} />
    </header>
  );
};

Header.propTypes = {
  onChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
