/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useTodos } from '../context/TodosContext';
import { Todo } from '../types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const {
    toggleTodo,
    deleteTodo,
    editTodo,
    editingId,
    setEditingId,
    editTitle,
    setEditTitle,
    newTodoRef,
  } = useTodos();

  const handleDelete = () => {
    deleteTodo(todo.id);
    newTodoRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = editTitle.trim();

    if (title) {
      editTodo(todo.id, title);
    } else {
      handleDelete();
    }

    setEditingId(null);
  };

  const handleBlur = () => {
    const title = editTitle.trim();

    if (title) {
      editTodo(todo.id, title);
    } else {
      handleDelete();
    }

    setEditingId(null);
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${
        editingId === todo.id ? 'editing' : ''
      }`}
    >
      <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
        <input
          data-cy="TodoStatus"
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {editingId === todo.id ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            value={editTitle}
            autoFocus
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={e => e.key === 'Escape' && setEditingId(null)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditingId(todo.id);
              setEditTitle(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            data-cy="TodoDelete"
            className="todo__remove"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
