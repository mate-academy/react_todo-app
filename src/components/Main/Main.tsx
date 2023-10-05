import React, { useContext } from 'react';
import { TodoList } from '../TodoList';
import { StateContext } from '../TodosContext';

export const Main: React.FC = () => {
  const todos = useContext(StateContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={todos} />
    </section>
  );
};
