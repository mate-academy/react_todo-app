import { useContext, useRef } from 'react';
import { ToDoContext } from '../store/AppContext';
import { TodoProps } from '../types/types';
import cn from 'classnames';

export const SingleToDo: React.FC<TodoProps> = ({ todo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useContext(ToDoContext).dispatch;
  const isEditing = todo.isEditing;

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_TODO', payload: todo.id });
  };

  const handleStartEditing = () => {
    dispatch({ type: 'START_EDITING', payload: todo.id });
  };

  const handleCancelEditing = () => {
    dispatch({ type: 'CANCEL_EDITING', payload: todo.id });
  };

  const handleEdit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    const newTitle = inputRef.current?.value.trim();

    if (!newTitle) {
      dispatch({ type: 'DELETE_TODO', payload: todo.id });

      return;
    }

    dispatch({
      type: 'EDIT_TODO',
      payload: { id: todo.id, title: newTitle },
    });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          name="status"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleComplete}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleStartEditing}
          >
            {todo.title.trim()}
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
        <form onSubmit={handleEdit}>
          <input
            defaultValue={todo.title}
            autoFocus
            onBlur={handleEdit}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                handleCancelEditing();
              }
            }}
          />
        </form>
      )}
    </div>
  );
};
