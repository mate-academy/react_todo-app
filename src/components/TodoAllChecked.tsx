import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../TodoContext';

export const TodoAllChecked: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [
    isChecked,
    setIsChecked,
  ] = useState(todos.every(todo => todo.completed));

  useEffect(() => {
    if (todos.every(todo => todo.completed)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [todos]);

  const handleToggleAllChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

    setTodos(todos.map(todo => (
      { ...todo, completed: !isChecked }
    )));
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAllChange}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
