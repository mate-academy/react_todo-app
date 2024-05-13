import React, { useContext, useState } from 'react';
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
    //console.log('on blur');
    if (title.trim()) {
      dispatch({
        type: ActionTypes.EDIT_TODO,
        payload: { id: todo.id, title },
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

  //console.log(editMode);
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
