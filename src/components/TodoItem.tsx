import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../contexts/TodoContext';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo, newTodoInputRef } =
    useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '') {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, trimmedTitle);
    }

    setIsEditing(false);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    newTodoInputRef.current?.focus();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>
      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyUp={handleEscape}
            autoFocus
          />
        </form>
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
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
