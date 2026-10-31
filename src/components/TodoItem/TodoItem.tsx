import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodosDispatch } from '../../store/TodosStore';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useTodosDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label
        className="todo__status-label"
        htmlFor={`todo-${todo.id}`}
        aria-label="Toggle todo status"
      >
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            dispatch({
              type: 'toggleTodo',
              payload: todo.id,
            });
          }}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__title-field"
          data-cy="TodoTitleField"
          value={editedTitle}
          onChange={event => setEditedTitle(event.target.value)}
          autoFocus
          onKeyDown={event => {
            if (event.key === 'Enter') {
              if (editedTitle.trim()) {
                dispatch({
                  type: 'editTodo',
                  payload: {
                    id: todo.id,
                    title: editedTitle.trim(),
                  },
                });
              } else {
                dispatch({
                  type: 'deleteTodo',
                  payload: todo.id,
                });
              }

              setIsEditing(false);
            }

            if (event.key === 'Escape') {
              setEditedTitle(todo.title);
              setIsEditing(false);
            }
          }}
          onBlur={() => {
            if (editedTitle.trim()) {
              dispatch({
                type: 'editTodo',
                payload: {
                  id: todo.id,
                  title: editedTitle.trim(),
                },
              });
            } else {
              dispatch({
                type: 'deleteTodo',
                payload: todo.id,
              });
            }

            setIsEditing(false);
          }}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            dispatch({
              type: 'deleteTodo',
              payload: todo.id,
            });
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
