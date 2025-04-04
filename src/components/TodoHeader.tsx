import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoForm } from './TodoForm';

export const TodoHeader: React.FC = () => {
  const { todos, isAllCompleted, handleToggleAll } = useTodo();

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <TodoForm />
    </header>
  );
};
