import React, { useState, useEffect } from 'react';
import { Todo, useTodo } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodoTitle } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  useEffect(() => {
    setNewTodoTitle(todo.title);
  }, [todo.title]);
  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();

    if (newTodoTitle.trim()) {
      updateTodoTitle(todo.id, newTodoTitle.trim());
      setIsEditing(false);
    } else {
      deleteTodo(todo.id);
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label
        className="todo__status-label"
        htmlFor={`todo-status-${todo.id}`}
        aria-label={`Mark todo "${todo.title}" as ${todo.completed ? 'incomplete' : 'completed'}`}
      >
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
            onBlur={handleSubmit}
            onKeyUp={event => event.key === 'Escape' && setIsEditing(false)}
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
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
