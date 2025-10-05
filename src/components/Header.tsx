import React, { useContext, useEffect, useState } from 'react';

import { TodoForm } from './TodoForm';
import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../types/types';

export const Header: React.FC = () => {
  const { todos, toggleAll } = useContext<TodoContextType>(TodoContext);
  const [allCompleted, setAllCompleted] = useState(false);

  const checkCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    setAllCompleted(checkCompleted);
  }, [todos, checkCompleted]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll(!allCompleted)}
        />
      )}

      <TodoForm />
    </header>
  );
};
