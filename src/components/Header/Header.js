import React from 'react';
import { HeaderShape } from '../../Shapes';
import { TodoInput } from '../TodoInput/TodoInput';

export const Header = (props) => {
  const { addTodo } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoInput addTodo={addTodo} />
    </header>
  );
};

Header.propTypes = HeaderShape.isRequired;
