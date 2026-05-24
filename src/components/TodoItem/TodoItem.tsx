import { KeyboardEvent, useContext, useState } from 'react';
import { Todo } from '../../types/type';
import { TodoContext } from '../Context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const context = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  if (!context) {
    return null;
  }

  const { dispatch } = context;

  const saveTitle = () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'delete', payload: todo.id });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'update',
      payload: {
        id: todo.id,
        title: trimmedTitle,
      },
    });
    setIsEditing(false);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveTitle();
    }

    if (event.key === 'Escape') {
      setDraftTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`todo ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
      data-cy="Todo"
    >
      <div className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          aria-label="Toggle todo status"
          data-cy="TodoStatus"
          checked={todo.completed}
          onChange={() => {
            dispatch({
              type: 'update',
              payload: {
                id: todo.id,
                completed: !todo.completed,
              },
            });
          }}
        />
      </div>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            saveTitle();
          }}
        >
          <input
            type="text"
            className="todo__title-field"
            data-cy="TodoTitleField"
            value={draftTitle}
            onChange={event => setDraftTitle(event.target.value)}
            onBlur={saveTitle}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            data-cy="TodoTitle"
            onDoubleClick={() => {
              setDraftTitle(todo.title);
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'delete', payload: todo.id })}
          >
            x
          </button>
        </>
      )}
    </div>
  );
};
