import React from 'react';
import { TodoList } from '../TodoList/TodoList';

type Props = {
  handleCompleteAll: () => void;
};

export const Main: React.FC<Props> = ({ handleCompleteAll }) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleCompleteAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
