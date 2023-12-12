import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import { TodoList } from './TodoList/TodoList';

export const Main: React.FC = () => {
  const {
    handleAllCompleted,
  } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
