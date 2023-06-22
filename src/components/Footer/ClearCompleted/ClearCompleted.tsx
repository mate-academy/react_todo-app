import React from 'react';
import { Todo } from 'types/Todo';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
};

export const ClearCompleted: React.FC<Props> = React.memo(({
  todos,
  clearCompleted,
}) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <>
      {hasCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
});
