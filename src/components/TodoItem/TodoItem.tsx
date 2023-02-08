import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  isLoading: boolean;
  removeTodoFromServer?: (todoId: number) => void;
  toggleTodoStatusOnServer: (todoId: number, status: boolean) => Promise<void>;
  changeTodoTitleOnServer: (todoId: number, newTitle: string) => Promise<void>;
}

export const TodoItem: FC<Props> = memo(({
  todo,
  isLoading,
  removeTodoFromServer,
  toggleTodoStatusOnServer,
  changeTodoTitleOnServer,
}) => {
  const {
    title,
    completed,
    id,
  } = todo;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const titleInput = useRef<HTMLInputElement>(null);

  const handleRemove = useCallback(() => {
    if (removeTodoFromServer) {
      removeTodoFromServer(id);
    }
  }, []);

  const handleToggleStatus = useCallback(() => {
    toggleTodoStatusOnServer(id, !completed);
  }, [completed]);

  const changeTodoTitle = useCallback(() => {
    const trimmedNewTitle = newTitle.trim();

    setIsFormVisible(false);

    if (title === trimmedNewTitle) {
      return;
    }

    if (!trimmedNewTitle) {
      handleRemove();

      return;
    }

    setNewTitle(trimmedNewTitle);
    changeTodoTitleOnServer(id, trimmedNewTitle);
  }, [title, newTitle]);

  const handleFormSubmit = useCallback((
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    changeTodoTitle();
  }, [changeTodoTitle]);

  const handleInputBlur = useCallback(() => {
    changeTodoTitle();
  }, [changeTodoTitle]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTitle(e.target.value);
  }, []);

  const handleInputKeydown = useCallback((
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Escape') {
      setIsFormVisible(false);
      setNewTitle(title);
    }
  }, [title]);

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [isFormVisible]);

  return (
    <li
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={handleToggleStatus}
          defaultChecked
        />
      </label>

      {isFormVisible
        ? (
          <form onSubmit={handleFormSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              ref={titleInput}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
              onBlur={handleInputBlur}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsFormVisible(true)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={handleRemove}
            >
              ×
            </button>
          </>
        )}

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal',
          'overlay',
          { 'is-active': isLoading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
});
