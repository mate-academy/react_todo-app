import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../context/TodosContext';

export const Main: React.FC = () => {
  const {
    filtredTodos,
    leftTodo,
    handleToggleAll,
  } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={leftTodo === 0}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filtredTodos()} />
    </section>
  );
};
