import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

type Props = {
  todo: Todo;
  onDelete: (todoId: string) => void,
  onUpdate: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [editing, setEditing] = useState(false);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && titleField.current) {
      titleField.current.focus();
    }
  }, [editing]);

  function toggle() {
    onUpdate({ ...todo, completed: !todo.completed });
  }

  function remove() {
    onDelete(todo.id);
  }

  function startEditing() {
    setEditing(true);
    setUpdatedTitle(todo.title);
  }

  function close() {
    setEditing(false);
    setUpdatedTitle('');
  }

  function save() {
    if (!updatedTitle) {
      return;
    }

    onUpdate({ ...todo, title: updatedTitle });
    close();
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdatedTitle(event.target.value);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Escape') {
      close();
    }

    if (event.code === 'Enter') {
      save();
    }
  }

  return (
    <li
      key={todo.id}
      className={cn({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={toggle}
        />

        <label onDoubleClick={startEditing}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          onClick={remove}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={titleField}
        value={updatedTitle}
        onChange={handleTitleChange}
        onKeyUp={handleKeyUp}
        onBlur={save}
      />
    </li>
  );
};
