import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../../store/TodoContext';
import { ActionTypes, Todo } from '../../store/types';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo?.title);

  const dispatch = useContext(DispatchContext);
  const onDelete = () => {
    dispatch({ type: ActionTypes.DELETE_TODO, payload: todo.id });
  };

  const onBlur = () => {
    if (title.trim()) {
      dispatch({
        type: ActionTypes.EDIT_TODO,
        payload: { id: todo.id, title: title.trim() },
      });
    } else {
      dispatch({ type: ActionTypes.DELETE_TODO, payload: todo.id });
    }

    setEditMode(false);
  };

  const onSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onBlur();
    } else if (event.key === 'Escape') {
      setTitle(todo.title);
      setEditMode(false);
    }
  };

  const renameField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renameField.current && editMode) {
      renameField.current.focus();
    }
  }, [editMode]);

  return (
    <div data-cy="Todo" className={todo?.completed ? 'todo completed' : 'todo'}>
      <label className="todo__status-label">
        <input
          onChange={() =>
            dispatch({ type: ActionTypes.TOGGLE_TODO, payload: todo.id })
          }
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo?.completed}
        />
      </label>
      {editMode ? (
        <form onKeyUp={onSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={onBlur}
            ref={renameField}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setEditMode(true)}
            data-cy="TodoTitle"
            className="todo__title"
          >
            {todo?.title}
          </span>
          <button
            onClick={onDelete}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
