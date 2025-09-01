/* eslint-disable @typescript-eslint/no-shadow */
import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  todo: Todo;
  onDelete: (value: number) => void;
  updateCompletedTodo: (value: Todo) => void;
};

export const ToDo: React.FC<Props> = ({
  todo,
  onDelete,
  updateCompletedTodo,
}) => {
  const context = useContext(TodosContext);
  const { todos, saveTodos } = context;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const todoEditingInput = useRef<HTMLInputElement>(null);

  function updateTitleTodo(todo: Todo) {
    const updatedTodo = {
      ...todo,
      title: editedTitle.trim(),
    };

    saveTodos(
      todos.map((todo: Todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, title: editedTitle.trim() }
          : todo,
      ),
    );
  }

  function handleUpdateSubmit(event: React.FormEvent) {
    event.preventDefault();

    const normalizedEditedTitle = editedTitle.trim();

    if (!normalizedEditedTitle) {
      onDelete(todo.id);

      return;
    }

    if (normalizedEditedTitle === todo.title) {
      setIsEditing(false);
      setEditedTitle(todo.title.trim());

      return;
    }

    updateTitleTodo({
      id: todo.id,
      userId: 1,
      title: normalizedEditedTitle,
      completed: todo.completed,
    });
    setIsEditing(false);
  }

  function handleBlur() {
    const normalizedEditedTitle = editedTitle.trim();

    if (!normalizedEditedTitle) {
      onDelete(todo.id);
      setIsEditing(false);

      return;
    }

    if (normalizedEditedTitle === todo.title) {
      setIsEditing(false);
      setEditedTitle(todo.title.trim());

      return;
    }

    updateTitleTodo({
      ...todo,
      title: normalizedEditedTitle,
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      todoEditingInput.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div
        data-cy="Todo"
        className={cn('todo', {
          completed: todo.completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => updateCompletedTodo(todo)}
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleUpdateSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onChange={event => setEditedTitle(event.target.value)}
              onBlur={handleBlur}
              onKeyUp={event => {
                if (event.key === 'Escape') {
                  setEditedTitle(todo.title.trim());
                  setIsEditing(false);
                }
              }}
              ref={todoEditingInput}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                todoEditingInput.current?.focus();
                setEditedTitle(todo.title);
                setIsEditing(true);
              }}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => onDelete(todo.id)}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
