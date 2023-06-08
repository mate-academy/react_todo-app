import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onDeleteCompletedTodos: () => void,
};

export const DeleteCompletedButton: React.FC<Props> = ({
  todos,
  onDeleteCompletedTodos,
}) => {
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      {completedTodos ? (
        <button
          type="button"
          className="clear-completed"
          onClick={onDeleteCompletedTodos}
        >
          Clear completed
        </button>
      ) : (
        <button
          type="button"
          className="clear-completed"
          style={{ opacity: 0, cursor: 'auto' }}
          disabled
        >
          Clear completed
        </button>
      )}
    </>
  );
};
