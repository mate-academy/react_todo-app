import React from 'react';

type Props = {
  title:string
};

export const TempTodo:React.FC<Props> = ({ title }) => {
  return (
    <div className="todo">
      <label className="todo__status-label">
        <input type="checkbox" className="todo__status" />
      </label>

      <span className="todo__title">
        {title}
      </span>
      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
