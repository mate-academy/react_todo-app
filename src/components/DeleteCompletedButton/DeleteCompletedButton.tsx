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
    <button
      type="button"
      className="todoapp__clear-completed"
      {...(completedTodos ? ({
        onClick: onDeleteCompletedTodos,
      }) : (
        { disabled: true }
      ))}
      style={{
        opacity: completedTodos ? 1 : 0,
        cursor: completedTodos ? 'pointer' : 'auto',
      }}
    >
      Clear completed
    </button>
  );
};
