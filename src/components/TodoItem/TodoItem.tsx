import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { DispatchContex } from '../../Store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;
  const [value, setValue] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useContext(DispatchContex);

  const inputRef = useRef<HTMLInputElement>(null);

  const handlerEndEdit = () => {
    if (!value.trim()) {
      dispatch({ type: 'remove', payload: id });
    } else {
      dispatch({
        type: 'set-title',
        payload: { id, title: value.trim() },
      });
      setIsEdit(false);
    }
  };

  const handlerSubmitEdit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handlerEndEdit();
  };

  const handlerOnKeyUpEsc = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Escape') {
      setValue(todo.title);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (inputRef.current && isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            dispatch({
              type: 'set-complete',
              payload: { id, completed: !completed },
            });
          }}
        />
      </label>

      {isEdit ? (
        <form onSubmit={handlerSubmitEdit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            value={value}
            onChange={evt => setValue(evt.target.value)}
            onBlur={handlerEndEdit}
            onKeyUp={handlerOnKeyUpEsc}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdit(true)}
            autoFocus
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              dispatch({ type: 'remove', payload: id });
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
