import React from 'react';
import { Todo as TodoType } from '../types/Todo';

type TodoProps = {
  todo: TodoType;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
  );
};
