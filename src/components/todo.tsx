import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, Todo } from '../context/global-context';

export const ToDo = ({ todo }: { todo: Todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState<Todo | null>(null);
  const [title, setTitle] = useState(todo.title);

  const editFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    }
  }, [isEditing]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'remove', payload: { id: todo.id } });
    } else if (trimmedTitle !== todo.title) {
      dispatch({
        type: 'edit',
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    setIsEditing(null);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() =>
            dispatch({ type: 'toggle', payload: { id: todo.id } })
          }
        />
      </label>

      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(todo);
            setTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={submit}>
          <input
            ref={editFieldRef}
            data-cy="TodoTitleField"
            className="todo__title-field"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => submit()}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setTitle(todo.title);
                setIsEditing(null);
              }
            }}
          />
        </form>
      )}
      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => dispatch({ type: 'remove', payload: { id: todo.id } })}
        >
          ×
        </button>
      )}
    </div>
  );
};
