import React, { useMemo } from 'react';
import { ITodo } from 'types/Todo';

type Props = {
  todos: ITodo[];
  clearCompleted: () => void;
};

export const ClearCompleted: React.FC<Props> = React.memo(({
  todos,
  clearCompleted,
}) => {
  const hasCompleted = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

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
