import React from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todos } from './Todos';

export const Main = () => {
  const { dispatch } = React.useContext(TodosContext);
  const handleToggleAll = () => {
    dispatch({ type: 'MARK_ALL_AS_COMPLETED' });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label
        onClick={handleToggleAll}
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
      <Todos />
    </section>
  );
};
