import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const ToggleAll: React.FC = () => {
  const {
    todos, setTodos, activeTodos,
  } = useContext(TodosContext);

  const handleToggleAllChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodos(
      todos.map(todo => {
        return {
          ...todo,
          completed: event.target.checked,
        };
      }),
    );
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={activeTodos.length === 0}
        onChange={handleToggleAllChange}

      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
