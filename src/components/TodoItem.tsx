import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodoDispatch } from '../context/TodoContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const dispatch = useTodoDispatch();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const saveTodo = () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle.length === 0) {
      dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
    } else {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveTodo();
  };

  const handleBlur = () => {
    saveTodo();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
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
