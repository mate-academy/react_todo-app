/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo as TodoType } from '../../types/Todo';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { DispatchContext } from '../../context/TodoContextProvider';
import { normalizeTodoTitle } from '../../utils/normalizeTodoTitle';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleTodoDeletion = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  };

  const handleCompletionStatusChange = () => {
    dispatch({ type: 'toggleCompletionStatus', payload: [todo.id] });
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = (pressedKeyValue: string) => {
    if (pressedKeyValue === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleNewTitleSubmition = () => {
    const normalizedEditTitle = normalizeTodoTitle(editTitle);

    if (!normalizedEditTitle) {
      dispatch({ type: 'deleteTodo', payload: todo.id });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'updateTodoTitle',
      payload: { id: todo.id, title: normalizedEditTitle },
    });
    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={!!todo.completed}
          onChange={() => handleCompletionStatusChange()}
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEditing}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleTodoDeletion}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleNewTitleSubmition();
          }}
          onBlur={handleNewTitleSubmition}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onKeyUp={event => handleCancelEditing(event.key)}
          />
        </form>
      )}
    </div>
  );
};
