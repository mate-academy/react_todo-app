import { Todo } from '../../types/Todo';
import { FC, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useTodosContext } from '../../context/TodosContext';
import classNames from 'classnames';
import { updateTodoValue } from '../../helpers/updateTodoValue';

interface Props {
  todo: Todo;
  startEditingTitle: (id: number) => void;
  isEditing: boolean;
  onSave: () => void;
}

export const TodoItem: FC<Props> = ({
  todo,
  startEditingTitle,
  isEditing,
  onSave,
}) => {
  const { handleDelete, setTodos } = useTodosContext();
  const { id, title, completed } = todo;
  const [initialTitle, setInitialTitle] = useState(title);
  const [editingValue, setEditingValue] = useState(title);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const trimmedValue = editingValue.trim();

  const updateTodoStatus = () => {
    updateTodoValue({
      id,
      data: !completed,
      keyValue: 'completed',
      setTodos,
    });
  };

  const editTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!trimmedValue) {
        handleDelete(id);
      } else {
        updateTodoValue({
          id,
          data: trimmedValue,
          keyValue: 'title',
          setTodos,
        });
      }

      onSave();
    }

    if (e.key === 'Escape') {
      setEditingValue(initialTitle);
      onSave();
    }
  };

  const editTodoOnBlur = () => {
    if (!trimmedValue) {
      handleDelete(id);
    } else {
      updateTodoValue({
        id,
        data: trimmedValue,
        keyValue: 'title',
        setTodos,
      });
    }

    onSave();
  };

  useEffect(() => {
    inputRef.current?.focus();

    setInitialTitle(title);
  }, [isEditing, title]);

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onClick={updateTodoStatus}
          />
        </label>
        {isEditing ? (
          <form className="todo__form">
            <input
              ref={inputRef}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editingValue}
              onChange={e => setEditingValue(e.target.value)}
              onKeyDown={editTodo}
              onBlur={editTodoOnBlur}
            />
          </form>
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => startEditingTitle(id)}
          >
            {title}
          </span>
        )}

        {!isEditing && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(id)}
          >
            ×
          </button>
        )}
      </div>

      {/* This todo is being edited
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

         This form is shown instead of the title and remove button

      </div>

       This todo is in loadind state
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Todo is being saved now
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>*/}
    </>
  );
};
