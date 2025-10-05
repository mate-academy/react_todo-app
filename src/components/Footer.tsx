import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoFilters } from './TodoFilters';
import { type TodoContextType } from '../types/types';

export const Footer: React.FC = () => {
  const { todos, clearCompleted } = useContext<TodoContextType>(TodoContext);

  const remaining = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </span>

      <TodoFilters />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
