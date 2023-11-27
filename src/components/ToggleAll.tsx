import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoList } from './TodoList';

export const ToggleAll: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const completeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodos
    = todos.map((item) => ({ ...item, completed: e.target.checked }));

    setTodos(updatedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={!todos.find(todo => !todo.completed)}
        onChange={completeAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      {todos.length !== 0 && <TodoList />}

    </section>
  );
};
