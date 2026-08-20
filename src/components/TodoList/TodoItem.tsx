import cn from 'classnames';
import { Todo } from '../../context/types';
import { useDispatch } from '../../context/Context';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const [editedTitle, setEditTitle] = useState<string>('');
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  const startEdit = () => {
    setEditTitle(todo.title);
    setIsEdit(true);
  };

  const handleCancelEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }
  };

  const saveEdit = () => {
    const title = editedTitle.trim();

    setIsEdit(false);

    if (!title) {
      dispatch({ type: 'delete', payload: todo.id });

      return;
    }

    if (title !== todo.title) {
      dispatch({
        type: 'updateTitle',
        payload: { id: todo.id, title },
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveEdit();
  };

  const handleBlur = () => {
    saveEdit();
  };

  return (
    <div data-cy="Todo" className={cn('todo', todo.completed && 'completed')}>
      <label className="todo__status-label" aria-label="Todo status">
        <input
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

      {isEdit ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            className="todo__title-field"
            value={editedTitle}
            onChange={event => setEditTitle(event.target.value)}
            onKeyUp={handleCancelEdit}
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEdit}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() =>
              dispatch({
                type: 'delete',
                payload: todo.id,
              })
            }
          >
            x
          </button>
        </>
      )}
    </div>
  );
};
