import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  removeTodo,
  updateTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.title);
  const titleField = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editingText.trim()) {
        updateTodo(todo.id, editingText);
      } else {
        removeTodo(todo.id);
      }

      setEditing(false);
    } else if (event.key === 'Escape') {
      setEditing(false);
      setEditingText(todo.title);
    }
  };

  const handleBlur = () => {
    if (editingText.trim()) {
      updateTodo(todo.id, editingText);
    } else {
      removeTodo(todo.id);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (editing && titleField.current) {
      titleField.current.focus();
    }
  }, [editing]);

  return (
    <li
      className={`${todo.completed ? 'completed' : ''}${editing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${todo.completed ? 'toggle-completed' : 'toggle-view'}`}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
          aria-label="Delete todo"
        />
      </div>
      {editing && (
        <input
          ref={titleField}
          type="text"
          className="edit"
          id="toggle-editing"
          onChange={e => setEditingText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          value={editingText}
        />
      )}
    </li>
  );
};
