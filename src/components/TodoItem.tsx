import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');

  const handleSaveEdit = () => {
    const trimmed = editingTitle.trim();

    if (trimmed) {
      dispatch({
        type: 'UPDATE_TITLE',
        payload: { id: todo.id, title: trimmed },
      });
      setIsEditing(false);
    } else if (trimmed !== todo.title) {
      dispatch({
        type: 'DELETE',
        payload: todo.id,
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }

    if (e.key === 'Escape') {
      setEditingTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label" htmlFor={`todo__status-${todo.id}`}>
        <span className="is-sr-only">Toggle todo status</span>
        <input
          id={`todo__status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
      </label>

      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={e => {
            e.preventDefault();
            setIsEditing(true);
            setEditingTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      ) : (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder={!editingTitle ? 'Empty todo will be delete' : ''}
          value={editingTitle}
          autoFocus
          onChange={e => setEditingTitle(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
        />
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
        >
          ×
        </button>
      )}
    </div>
  );
};
