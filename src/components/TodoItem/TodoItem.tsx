import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoCondition } from '../../types/TodoCondition';
import { noop } from '../../utils/noop';

type Props = {
  todo: Todo,
  todoCondition: TodoCondition,
  onDeleteTodo?: (todoId: number) => void,
  toggleTodo?: (curentTodos: Todo[], isCompleted?: boolean) => void,
  handleSubmitEditing?: (id: number, editTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todoCondition,
  onDeleteTodo = noop,
  toggleTodo = noop,
  handleSubmitEditing = noop,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSubmit = () => {
    if (editTitle === '') {
      onDeleteTodo(id);
    }

    if (editTitle !== title) {
      handleSubmitEditing(id, editTitle);
    }

    setIsEditing(false);
  };

  const cancelEditing = (key: string) => {
    if (key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    }
  };

  const onBlurOrSubmit = (e: React.FocusEvent<HTMLInputElement, Element>
  | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    cancelEditing(e.key);
  };

  return (
    <div
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo([todo])}
        />
      </label>

      {isEditing
        ? (
          <form onSubmit={onBlurOrSubmit}>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editTitle}
              onChange={onChange}
              onBlur={onBlurOrSubmit}
              onKeyUp={onKeyUp}
            />
          </form>
        )
        : (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => onDeleteTodo(id)}
            >
              x
            </button>
          </>
        )}

      <div className={classNames(
        'modal',
        'overlay',
        { 'is-active': todoCondition !== TodoCondition.Neutral },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
