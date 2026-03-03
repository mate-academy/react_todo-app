/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import { Todo } from '../types/todo';
import classNames from 'classnames';
import { useTodoDispatch } from './TodoProvider';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitlte, setNewTitle] = useState('');
  const dispatch = useTodoDispatch();

  const handleDelete = () => {
    dispatch({ type: 'DELETE', payload: todo.id });
  };

  const handleChange = () => {
    dispatch({
      type: 'CHANGE',
      payload: {
        id: todo.id,
        data: { completed: !todo.completed },
      },
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setNewTitle(todo.title);
  };

  const savedTodo = () => {
    const trimmedTitle = newTitlte.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (trimmedTitle === '') {
      dispatch({ type: 'DELETE', payload: todo.id });

      return;
    }

    dispatch({
      type: 'CHANGE',
      payload: {
        id: todo.id,
        data: { title: trimmedTitle },
      },
    });

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      savedTodo();
    } else if (event.key === 'Escape') {
      setNewTitle('');
      setIsEditing(false);
    }
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: todo.completed,
          editing: isEditing,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={handleChange}
          />
        </label>
        {!isEditing ? (
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
        ) : (
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitlte}
              onChange={event => setNewTitle(event.target.value)}
              onBlur={savedTodo}
              onKeyUp={handleKeyUp}
              autoFocus
            />
          </form>
        )}
      </div>
    </>
  );
};
