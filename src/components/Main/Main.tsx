import React, { useContext } from 'react';
import { TodoList } from '../TodoList';
import { TodoUpdateContext } from '../../context/TodoContext';

export const Main: React.FC = () => {
  const { completeAll } = useContext(TodoUpdateContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={completeAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />

    </section>
  );
};
