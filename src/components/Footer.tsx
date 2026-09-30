import React from 'react';
import { useTodos } from '../context/TodosContext';
import { Filter } from './Filter';

export const Footer: React.FC = () => {
  const { activeCount, hasCompleted, clearCompleted } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
