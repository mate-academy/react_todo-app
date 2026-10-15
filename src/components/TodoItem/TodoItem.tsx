import { useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodosContext } from '../../context/TodosContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { handleDelete, handleUpdate } = useTodosContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const isFinishedRef = useRef(false);

  const handleSave = () => {
    if (isFinishedRef.current) {
      return;
    }

    isFinishedRef.current = true;

    const title = editTitle.trim();

    if (title === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!title) {
      handleDelete(todo.id);

      return;
    }

    handleUpdate(todo.id, { title });
    setIsEditing(false);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          aria-label={`Toggle ${todo.title}`}
          checked={todo.completed}
          onChange={() => {
            handleUpdate(todo.id, {
              completed: !todo.completed,
            });
          }}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            autoFocus
            type="text"
            className="todo__title-field"
            data-cy="TodoTitleField"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                isFinishedRef.current = true;
                setIsEditing(false);
                setEditTitle(todo.title);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              isFinishedRef.current = false;
              setEditTitle(todo.title);
              setIsEditing(true);
            }}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
