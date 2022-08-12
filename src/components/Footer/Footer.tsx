import React from 'react';
import { TodoFilter } from '../TodoFilter';

type Props = {
  onClear: () => void,
  onCount: () => void,
};

export const Footer: React.FC<Props> = ({ onClear, onCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${onCount()} items left`}
      </span>

      <TodoFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={onClear}
      >
        Clear completed
      </button>
    </footer>
  );
};
