import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';

export const TodoAllChecked: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [isChecked, setChecked] = useState(false);

  const handleToggleAllChange = () => {
    if (isChecked) {
      setChecked(false);
      setTodos(todos.map(todo => (
        { ...todo, completed: false }
      )));
    } else {
      setChecked(true);
      setTodos(todos.map(todo => (
        { ...todo, completed: true }
      )));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAllChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
