import React, { useState } from 'react';
import classNames from 'classnames';
import { useTodos, Todo } from '../TodosContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { todos, setTodos, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const updateTitleInLocalStorage = (newTitle: string) => {
    const updatedTodos = todos.map((t) => {
      return t.id === todo.id ? { ...t, title: newTitle } : t;
    });

    setTodos(updatedTodos);
  };

  const handleToggle = () => {
    const updatedTodos = todos.map(t => {
      return t.id === todo.id ? { ...t, completed: !t.completed } : t;
    });

    setTodos(updatedTodos);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSave = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle !== '') {
      updateTitleInLocalStorage(trimmedTitle);
      setIsEditing(false);
    } else {
      deleteTodo(todo.id);
    }
  };

  const handleEditCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEditSave();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${todo.id}`}
            checked={todo.completed}
            onChange={handleToggle}
          />

          <label
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleDoubleClick}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDelete}
            aria-label="Delete"
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={handleEditChange}
          onBlur={handleEditSave}
          onKeyUp={handleKeyUp}
        />
      )}
    </li>
  );
};
