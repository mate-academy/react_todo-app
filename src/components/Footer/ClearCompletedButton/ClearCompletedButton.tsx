import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  completedTodos: Todo[];
  handleDeleteTodo: (todoId: number) => Promise<void>;
};

export const ClearCompletedButton: React.FC<Props> = React.memo(({
  completedTodos,
  handleDeleteTodo,
}) => {
  const handleClearCompletedButton = () => {
    completedTodos.forEach(({ id }) => handleDeleteTodo(id));
  };

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      disabled={completedTodos.length === 0}
      style={{
        visibility: completedTodos.length ? 'visible' : 'hidden',
      }}
      onClick={handleClearCompletedButton}
    >
      Clear completed
    </button>
  );
});
