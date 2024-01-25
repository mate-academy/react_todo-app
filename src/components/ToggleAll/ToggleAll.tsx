import React, { useContext } from 'react';

import './ToggleAll.scss';
import { TodosContext } from '../../contexts/TodosContext';

const ToggleAll: React.FC = () => {
  const { setTodos } = useContext(TodosContext);

  const markAllCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(prevTodos => {
      return prevTodos.map(
        todo => ({ ...todo, completed: event.target.checked }),
      );
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={markAllCompleted}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

export default ToggleAll;
