/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const TodoItem: React.FC = () => {
  return (
    <div data-cy="Todo" className="todo completed">
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={true}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        Completed Todo
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
  );
};

export default TodoItem;
