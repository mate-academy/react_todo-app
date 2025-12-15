import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/todo';

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleTodo,
  updateTodo,
}) => {
  const checkboxId = `todo-${todo.id}-status`;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newTitle.length, newTitle.length);
    }
  }, [isEditing, newTitle.length]);

  const handleSave = (changeTitle: string) => {
    const trimmedTitle = changeTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(todo.id);
    } else if (trimmedTitle !== todo.title) {
      updateTodo(todo.id, trimmedTitle);
    }

    setIsEditing(false);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave(newTitle);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.title);
    }
  };

  const handleDoubleClick = () => {
    setNewTitle(todo.title);
    setIsEditing(true);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label" htmlFor={checkboxId}>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          id={checkboxId}
          aria-label={`Mark "${todo.title}" as complete`}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-edit"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={() => handleSave(newTitle)}
          onKeyDown={handleInputKeyPress}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
