import {
  FC, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onRemoveTodo: (todo: Todo) => void
  onChangeStatusTodo: (todoId: number) => void,
  setIdTodoForChange: React.Dispatch<React.SetStateAction<number[]>>,
  onEditTodo: (todo: Todo) => void
};

export const TodoItem: FC<Props> = ({
  todo,
  onRemoveTodo,
  onChangeStatusTodo,
  setIdTodoForChange,
  onEditTodo,
}) => {
  const { id, title = '', completed } = todo;
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(event.target.value);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEditTodo({
      ...todo,
      title: titleEdit,
    });
    setIdTodoForChange((prev) => [id, ...prev]);
    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitleEdit(title);
      setEditing(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={cn('todo', { completed })} key={`todo-${id}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onChangeStatusTodo && onChangeStatusTodo(id)}
        />
      </label>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="todo__title-field"
            type="text"
            value={titleEdit}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <span className="todo__title" onDoubleClick={handleDoubleClick}>
          {title}
        </span>
      )}
      <button
        type="button"
        className="todo__remove"
        onClick={() => onRemoveTodo && onRemoveTodo(todo)}
      >
        ×
      </button>
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
