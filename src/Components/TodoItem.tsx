/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Action, ActionNames } from './TodoContext';

type Props = {
  todo: Todo;
  dispatch: (action: Action) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);

  const handleEditInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      dispatch({ type: ActionNames.Delete, payload: todo.id });
    } else {
      dispatch({
        type: ActionNames.Update,
        payload: { id: todo.id, title: inputValue },
      });
    }

    setIsEditing(false);
  };

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setInputValue(todo.title);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue.trim() === '') {
      dispatch({
        type: ActionNames.Delete,
        payload: todo.id,
      });
    } else if (inputValue) {
      dispatch({
        type: ActionNames.Update,
        payload: { id: todo.id, title: inputValue },
      });
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: ActionNames.ToggleCompleted,
              payload: { id: todo.id, completed: !todo.completed },
            })
          }
        />
      </label>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      {isEditing ? (
        <form onSubmit={handleSubmit} onBlur={() => setIsEditing(false)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todoapp__edit-todo"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={inputValue}
            onChange={handleEditInput}
            onBlur={() => handleBlur()}
            onKeyUp={handleEscape}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() =>
              dispatch({ type: ActionNames.Delete, payload: todo.id })
            }
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
