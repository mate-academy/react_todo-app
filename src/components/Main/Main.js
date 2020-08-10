import React, { useContext } from 'react';
import { Context } from '../../context';
import TodoList from '../TodoList/TodoList';

function Main() {
  const { checkAll, todos } = useContext(Context);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={checkAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList todos={todos} />
    </section>
  );
}

export default Main;
