import React from 'react';
import { TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';

export const RemoveTodo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { deleteTodo } = React.useContext(TodoContext)!;

  return (
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={() => {
        deleteTodo(todo.id);
      }}
    >
      ×
    </button>
  );
};
