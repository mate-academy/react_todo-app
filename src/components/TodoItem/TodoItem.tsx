import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../context/StateContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [isEdited, setIsEdited] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const saveTitle = () => {
    const trimmedTitle = updatedTitle.trim();

    if (!trimmedTitle) {
      dispatch({
        type: 'deleteTodo',
        payload: todo.id,
      });
    } else {
      dispatch({
        type: 'updateTodo',
        payload: {
          id: todo.id,
          title: trimmedTitle,
        },
      });
    }

    setIsEdited(false);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setUpdatedTitle(todo.title);
      setIsEdited(false);
    }
  };

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
            dispatch({
              type: 'toggleStatus',
              payload: todo.id,
            })
          }
        />
      </label>

      {!isEdited ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdited(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={saveTitle}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={updatedTitle}
            onChange={event => setUpdatedTitle(event.target.value)}
            onBlur={saveTitle}
            onKeyUp={handleEscape}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
