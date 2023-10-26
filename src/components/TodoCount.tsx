import React from 'react';

export const TodoCount: React.FC = () => {
  return (
    <span className="todo-count" data-cy="todosCounter">
      3 items left
    </span>
  );
};
