import React, { useContext } from 'react';
import { TodoList } from '../TodoList';
import { DispatchContext, StateContext } from '../../Store';

export const Main: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={() => dispatch({ type: 'toggleAllCompletions' })}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList todos={todos} />
    </section>
  );
};
