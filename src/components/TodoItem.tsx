import React, { useState } from 'react';
import { useTodos } from './TodosContext';
import { Todo } from '../Types/Todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleToggle = () => {
    toggleTodo(todo.id, editedText);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const handleInputBlur = () => {
    if (editedText.trim() === '') {
      deleteTodo(todo.id);
    } else {
      toggleTodo(todo.id, editedText);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setEditedText(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={handleDoubleClick}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDelete}
          data-cy="deleteTodo"
          aria-label="Delete Todo"
        />
      </div>
      <input
        type="text"
        className="edit"
        id={`toggle-${todo.id}`}
        value={editedText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};

export default TodoItem;
