import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  tempTodo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  tempTodo,
}) => (
  <div className={classNames('todo', {
    completed: tempTodo.completed,
  })}
  >
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={tempTodo.completed}
        readOnly
      />
    </label>
    <span
      className="todo__title"
    >
      {tempTodo.title}
    </span>
    <button type="button" className="todo__remove">×</button>

    <div className="modal overlay is-active">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
