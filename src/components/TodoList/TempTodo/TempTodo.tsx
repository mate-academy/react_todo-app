import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo | null;
};

export const TempTodo: React.FC<Props> = React.memo(({ todo }) => {
  if (!todo) {
    return null;
  }

  const { completed, title } = todo;

  return (
    <div className={classNames('todo',
      { completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">{title}</span>

      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
