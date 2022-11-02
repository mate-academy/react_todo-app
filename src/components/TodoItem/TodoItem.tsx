import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onToggle: (todo: Todo) => void,
  onDelete: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <label
          htmlFor={`toggle-view${todo.id}`}
        >
          {todo.title}
        </label>
        <button
          aria-label="deleteBtn"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
};
