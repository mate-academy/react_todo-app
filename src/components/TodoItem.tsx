import React, { useState } from 'react';
import cn from 'classnames';
import { ListAct } from '../types/Actions';
import { Todo } from '../types/Todo';
import { Action } from './TodoContext';

type Props = {
  todo: Todo;
  dispatch: (action: Action) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, dispatch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = () => {
    setIsEdit(false);

    if (!title.trim()) {
      dispatch({ type: ListAct.Delete, payload: todo.id });
    } else {
      dispatch({
        type: ListAct.Update,
        payload: { id: todo.id, title: title.trim() },
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEdit(false);
    } else if (event.key === 'Enter') {
      handleFormSubmit();
    }
  };

  const handleBlur = () => {
    setTitle(title.trim());
    handleFormSubmit();
  };

  const handleComplete = () => {
    dispatch({
      type: ListAct.SetComplet,
      payload: { id: todo.id, completed: !todo.completed },
    });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleComplete}
        />
      </label>

      {isEdit ? (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            autoFocus
            onChange={handleFormChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEdit(true);
            }}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              dispatch({ type: ListAct.Delete, payload: todo.id });
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
