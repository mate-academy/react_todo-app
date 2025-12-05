import React from 'react';
import { useTodos } from '../context/TodoContext';
import { Filter } from './Filter';

export const Footer: React.FC = () => {
  const { activeTodos, completedTodos, clearCompleted } = useTodos();

  const itemsLeftText = activeTodos.length === 1 ? 'item left' : 'items left';

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} {itemsLeftText}
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
