import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { StateContext } from './TodosContext/TodosContext';

export const Main: React.FC = () => {
  const { todos } = useContext(StateContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompleted}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
