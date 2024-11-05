import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleChangeCheckbox: (id: number) => void;
  handleUpdateTodo: (id: number, newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDelete,
  handleChangeCheckbox,
  handleUpdateTodo,
}) => {
  const [isChangeInput, setIsChangeInput] = useState(false);
  const [changeInputText, setChangeInputText] = useState(todo.title);

  const inputRefChange = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChangeInput && inputRefChange.current) {
      inputRefChange.current.focus();
    }
  }, [isChangeInput]);

  const updateTodoFunction = () => {
    if (changeInputText.trim() === '') {
      handleDelete(todo.id);
    } else if (changeInputText !== todo.title) {
      handleUpdateTodo(todo.id, changeInputText);
    }

    setIsChangeInput(false);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Escape') {
      setIsChangeInput(false);
      setChangeInputText(todo.title);
    } else if (ev.key === 'Enter') {
      updateTodoFunction();
    }
  };

  const handleChangedForm: React.FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();
    updateTodoFunction();
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChangeCheckbox(todo.id)}
        />
        {}
      </label>

      {isChangeInput ? (
        <form onSubmit={handleChangedForm}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={changeInputText}
            onChange={ev => setChangeInputText(ev.target.value)}
            onBlur={updateTodoFunction}
            onKeyDown={handleKeyDown}
            ref={inputRefChange}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsChangeInput(true);
            }}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
