import React, { useState } from 'react';
import cn from 'classnames';
import { useTodos } from '../../TodosContext';
import { Todo } from '../../types/types';

export const TodoItem: React.FC<{
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}> = ({ todo, onToggle, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const { setTodos } = useTodos();

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      onDelete();
    } else {
      setTodos(prevTodos =>
        prevTodos.map(title =>
          title.id === todo.id
            ? { ...title, title: editedTitle.trim() }
            : title,
        ),
      );
      setEditing(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <li
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
          onChange={onToggle}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={onDelete}
          aria-label="Delete"
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        onBlur={handleSave}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
