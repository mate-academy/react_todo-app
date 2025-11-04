/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useDispatch } from '../store/Store';
import { useState } from 'react';

type Props = {
  todo: Todo;
};
export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  function handleCompletedTodo() {
    dispatch({
      type: 'CHANGE_StATUS_TODO',
      payload: { id: todo.id },
    });
  }

  function handleDeleteTodo() {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id: todo.id },
    });
  }

  function handleCancelEdit() {
    setEdit(false);
    setEditTitle(todo.title);
  }

  function handleSaveEdit() {
    setEdit(false);
    if (editTitle.length === 0) {
      handleDeleteTodo();

      return;
    }

    if (editTitle.trim() === todo.title) {
      return;
    }

    dispatch({
      type: 'EDIT_TITLE_TODO',
      payload: { id: todo.id, title: editTitle.trim() },
    });
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={handleCompletedTodo}
        />
      </label>

      {isEdit && (
        <form onSubmit={handleSaveEdit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            autoFocus
          />
        </form>
      )}

      {!isEdit && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setEdit(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEdit && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDeleteTodo}
        >
          ×
        </button>
      )}
    </div>
  );
}
