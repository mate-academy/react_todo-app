import React from 'react';
import { ShapeHeader } from './Shapes';

export const Header = ({ addTodo, handleInputChange, value }) => (
  <header className="header">
    <h1>todos</h1>

    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyUp={ev => addTodo(ev)}
      onChange={ev => handleInputChange(ev)}
      value={value}
    />
  </header>
);

Header.propTypes = ShapeHeader.isRequired;
