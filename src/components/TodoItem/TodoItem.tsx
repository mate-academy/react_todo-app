import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  handleDeleteTodo: (id: number) => void,
  handleUpdateTodo: (id: number, data: Partial<Todo>) => Promise<void>
  setError: (title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
  setError,
}) => {
  const { title, completed, id } = todo;
  const [input, setInput] = useState('');
  const [isStartEdit, setIsStartEdit] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement.current?.focus();
  }, [isStartEdit]);

  const handleCompleteChange = () => {
    if (handleUpdateTodo) {
      handleUpdateTodo(id, { completed: !completed });
    }
  };

  const removeTodo = () => {
    if (handleDeleteTodo) {
      handleDeleteTodo(id);
    }
  };

  const handleTitleUpdate = () => {
    setIsStartEdit(false);

    const inputTrim = input.trim();

    if (inputTrim === title) {
      return;
    }

    if (!input && handleDeleteTodo) {
      handleDeleteTodo(id);

      return;
    }

    if (handleUpdateTodo) {
      handleUpdateTodo(id, { title: inputTrim });
    } else {
      setError('Unable to update a todo');
    }
  };

  const handleDoubleClick = () => {
    setInput(title);
    setIsStartEdit(true);
  };

  const handleCloseEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Escape') {
      setInput('');
      setIsStartEdit(false);
    }
  };

  return (
    <div className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleCompleteChange}
        />
      </label>

      {isStartEdit ? (
        <form
          onSubmit={handleTitleUpdate}
        >
          <input
            type="text"
            className="todo__title-edit"
            placeholder="Empty todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputElement}
            onBlur={handleTitleUpdate}
            onKeyUp={handleCloseEdit}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={removeTodo}
          >
            ×
          </button>
        </>
      )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
