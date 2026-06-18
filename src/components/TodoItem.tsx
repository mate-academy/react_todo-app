import React, { useState, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { deleteTodo, updateTodo } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const editField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editField.current?.focus();
    }
  }, [isEditing]);

  const saveTitle = () => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(todo.id);
    } else if (trimmedTitle !== todo.title) {
      updateTodo({ ...todo, title: trimmedTitle });
    }

    setIsEditing(false);
    setNewTitle(trimmedTitle || todo.title);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.title);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveTitle();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          aria-label={`Toggle ${todo.title}`}
          data-cy="TodoStatus"
          className="todo__status"
          type="checkbox"
          checked={todo.completed}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            ref={editField}
            className="todo__input"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            onBlur={saveTitle}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            data-cy="TodoTitle"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
