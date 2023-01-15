import React from 'react';

type Props = {
  todoTitle: string,
};

export const TempTodoItem: React.FC<Props> = ({ todoTitle }) => (
  <div
    key={0}
    className="todo"
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
      />
    </label>

    <span className="todo__title">
      {todoTitle}
    </span>
    <button
      type="button"
      className="todo__remove"
    >
      ×
    </button>

    <div
      className="modal overlay is-active"
    >
      <div className="loader" />
    </div>
  </div>
);
