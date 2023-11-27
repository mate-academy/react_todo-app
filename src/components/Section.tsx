import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext } from '../TodosContext';

export const Section: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const toggleAll = () => {
    dispatch({
      type: 'completeAll',
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
