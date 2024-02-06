import React, { useState } from 'react';
import { useTodos } from '../../../Store';
import { NewTodoItem } from '../../types/NewTodoItem';

type Props = {
  todo: NewTodoItem;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleToggleTodo = () => {
    toggleTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (title.trim() === '') {
        removeTodo(todo.id);
      } else {
        setIsEditing(false);
      }
    } else if (event.key === 'Escape') {
      setTitle(title);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (title.trim() === '') {
      removeTodo(todo.id);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleToggleTodo}
        />

        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>

      {isEditing && (
        <input
          className="edit"
          value={title}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};
