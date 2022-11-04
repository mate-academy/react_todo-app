import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onToggle: (todo: Todo) => void,
  onUpdate: (todoId: number, title: string) => void,
  onDelete: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>(todo.title);
  const currentInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentInputField.current) {
      currentInputField.current.focus();
    }
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditing(false);
      setTitleEdit(todo.title);
    }

    if (event.key === 'Enter') {
      if (!titleEdit.trim()) {
        onDelete(todo.id);
      }

      if (titleEdit !== todo.title) {
        onUpdate(todo.id, titleEdit);
      }

      setEditing(false);
    }
  };

  const handleInputBlur = () => {
    if (!titleEdit.trim()) {
      onDelete(todo.id);
    }

    if (titleEdit !== todo.title) {
      onUpdate(todo.id, titleEdit);
    }

    setEditing(false);
  };

  return (
    <li
      key={todo.id}
      className={
        classnames(
          { editing },
          { completed: todo.completed },
        )
      }
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <label>
          {todo.title}
        </label>
        <button
          aria-label="deleteBtn"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        placeholder="Empty todo will be deleted"
        value={titleEdit}
        onChange={({ target }) => setTitleEdit(target.value)}
        onKeyDown={handleKeyPress}
        onBlur={() => handleInputBlur()}
        ref={currentInputField}
      />
    </li>
  );
};
