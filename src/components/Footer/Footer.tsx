import React from 'react';
import { Filter } from '../Filter';
import { useTodo } from '../../context/TodoContext';

export const Footer: React.FC = () => {
  const { todos, clearCompleted } = useTodo();

  if (todos.length === 0) {
    return null;
  }

  const onClick = () => {
    clearCompleted();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClick}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear Completed
      </button>
    </footer>
  );
};
