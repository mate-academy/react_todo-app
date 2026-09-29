import classNames from 'classnames';
import React, { useContext, useState } from 'react';

import type { Todo as TodoType } from '../App';
import { TodoContext } from '../context/TodoContext';

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const context = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { dispatch } = context;

  const handleSave = () => {
    const newTitle = editedTitle.trim();

    if (!newTitle) {
      dispatch({
        type: 'remove',
        payload: todo.id,
      });

      return;
    }

    dispatch({
      type: 'update',
      payload: {
        id: todo.id,
        title: newTitle,
      },
    });

    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <span className="visually-hidden">Toggle todo status</span>

        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: 'toggle',
              payload: todo.id,
            })
          }
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={event => setEditedTitle(event.target.value)}
            onBlur={handleSave}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditedTitle(todo.title);
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditedTitle(todo.title);
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() =>
              dispatch({
                type: 'remove',
                payload: todo.id,
              })
            }
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
