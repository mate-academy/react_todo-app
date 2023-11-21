import React, { useState } from 'react';
import classNames from 'classnames';
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
    const result = editedText.trim() === ''
      ? deleteTodo(todo.id)
      : toggleTodo(todo.id, editedText);

    setIsEditing(false);

    return result;
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleInputBlur();
        break;
      case 'Escape':
        setEditedText(todo.title);
        setIsEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
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
