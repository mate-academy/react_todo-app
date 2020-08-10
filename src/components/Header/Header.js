import React, { useContext } from 'react';
import { Context } from '../../context';

function Header() {
  const { addTodo, todoTitle, setTodoTitle } = useContext(Context);

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyPress={addTodo}
        onChange={event => setTodoTitle(event.target.value)}
        value={todoTitle}
      />
    </header>
  );
}

export default Header;
