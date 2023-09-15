import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTodosContext } from '../context/TodosContext';
import { TodoItemProps } from '../types/todoTypes';

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo, editTodo } = useTodosContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
    if (!isEditing) {
      toggleTodo(todo.id);
    }
  };

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = () => {
    removeTodo(todo.id);
  };

  const handleEditTodo = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    editTodo(todo.id, editTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editTitle === '') {
        removeTodo(todo.id);
      } else {
        handleSaveEdit();
      }
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (editTitle === '') {
      removeTodo(todo.id);
    } else {
      handleSaveEdit();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggle}
          checked={todo.completed}
        />
        {isEditing ? (
          <input
            type="text"
            className="editing"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onKeyDown={handleKeyPress}
            ref={inputRef}
            onBlur={handleBlur}
          />
        ) : (
          <label onDoubleClick={handleEditTodo}>
            <span>{todo.title}</span>
          </label>
        )}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemove}
        />
      </div>
    </li>
  );
}
