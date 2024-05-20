import React from 'react';
import classNames from 'classnames';

import './TodoItem.scss';
import { ActionType } from '../../types/ActionType';
import { Props } from './Props';
import { useEditTodo } from './useEditTodo';

// eslint-disable-next-line react/display-name
export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const {
    isEditing,
    setIsEditing,
    newTitle,
    setNewTitle,
    handleSubmit,
    setTodos,
  } = useEditTodo(todo);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            setTodos({ type: ActionType.ChangeStatus, payload: todo.id })
          }
        />
      </label>

      {!isEditing ? (
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
            onClick={() =>
              setTodos({ type: ActionType.DeleteTodo, payload: todo.id })
            }
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={() => handleSubmit(todo)}
          onBlur={() => handleSubmit(todo)}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setIsEditing(false);
                setNewTitle(todo.title);
              }
            }}
            autoFocus
          />
        </form>
      )}
    </div>
  );
});
