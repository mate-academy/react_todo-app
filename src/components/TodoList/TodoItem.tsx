import React, {useEffect, useRef, useState} from 'react';
import {Todo} from '../../types/Todo';

interface TodoItemProps {
  todo: Todo;
  processingIds: number[];
  handleToggleTodo: (todo: Todo) => void;
  handleRemoveTodo: (id: number) => void;
  handleRenameTodo: (id: number, newTitle: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
                                                    todo,
                                                    processingIds,
                                                    handleToggleTodo,
                                                    handleRemoveTodo,
                                                    handleRenameTodo
                                                  }) => {
  const isProcessing = processingIds.includes(todo.id);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const itemClassName = `todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`;

  useEffect(() => {
    if (isEditing) {
      const inputRef = editInputRef.current;

      if (inputRef) {
        inputRef.focus();
        inputRef.setSelectionRange(
          inputRef.value.length,
          inputRef.value.length
        );
      }
    }
  }, [isEditing, todo.id]);

  const handleSave = async () => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      handleRemoveTodo(todo.id);

      return;
    }

    if (trimmedTitle !== todo.title) {
      await handleRenameTodo(todo.id, trimmedTitle);

      setNewTitle(trimmedTitle);
    } else {
      setNewTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        void handleSave();
        break;

      case 'Escape':
        setIsEditing(false);
        setNewTitle(todo.title);
        break;
    }
  };

  return (
    <div
      data-cy="Todo"
      className={itemClassName}
      key={todo.id}
      style={{position: 'relative'}}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          id={`todo-${todo.id}`}
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo)}
          disabled={isProcessing}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          ref={editInputRef}
          disabled={isProcessing}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => handleRemoveTodo(todo.id)}
            disabled={isProcessing}
            data-cy="TodoDelete"
          >
            X
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isProcessing ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter"/>
        <div className="loader"/>
      </div>
    </div>
  );
};
