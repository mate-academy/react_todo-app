import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { updateCompleted, deleteTodo, focusHeaderInput, renameTodo } =
    useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = (todoId: number) => {
    deleteTodo(todoId);
    focusHeaderInput();
  };

  const handleUpdate = (todoId: number) => {
    updateCompleted(todoId);
    focusHeaderInput();
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();

    inputRef.current?.focus();

    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      deleteTodo(todo.id);

      return;
    }

    renameTodo(todo.id, trimmedTitle);
    setIsEditing(false);
    focusHeaderInput();
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={`todo ${todo.completed && `completed`}`}
        key={todo.id}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => handleUpdate(todo.id)}
          />
        </label>

        {!isEditing && (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}

        {isEditing && (
          <form onSubmit={handleSubmitEdit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              onBlur={handleSubmitEdit}
              ref={inputRef}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  handleSubmitEdit(e);
                  setIsEditing(false);
                } else if (e.key === 'Escape') {
                  setEditedTitle(todo.title);
                  setIsEditing(false);
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
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>
        )}
      </div>
    </>
  );
};
