/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo } from '../types/Todo';
import { useTodoContext } from '../hooks/useTodoContext';
import { ActionType } from '../reduces/TodoReducer';
import { KeyboardEvent, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const { dispatch } = useTodoContext();

  const saveChanges = () => {
    if (!title.trim()) {
      dispatch({ type: ActionType.DELETE_TODO, payload: todo.id });
    } else {
      dispatch({
        type: ActionType.UPDATE_TODO,
        id: todo.id,
        title: title.trim(),
      });
    }

    setEditable(false);

    return;
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveChanges();
    }

    if (event.key === 'Escape') {
      setEditable(false);
    }
  };

  const handleDoubleClick = () => {
    setEditable(true);
  };

  const handleOnBlur = () => {
    saveChanges();
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <label className="todo__status-label">
        <input
          id="todo-status"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() =>
            dispatch({ type: ActionType.TOGGLE_TODO, payload: todo.id })
          }
          checked={todo.completed}
        />
      </label>
      {editable ? (
        <input
          type="text"
          value={title}
          className="todo__title-field"
          data-cy="TodoTitleField"
          onKeyUp={handleKeyUp}
          onChange={event => setTitle(event.target.value)}
          onBlur={handleOnBlur}
          autoFocus
        />
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!editable && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() =>
            dispatch({ type: ActionType.DELETE_TODO, payload: todo.id })
          }
        >
          ×
        </button>
      )}
    </div>
  );
};
