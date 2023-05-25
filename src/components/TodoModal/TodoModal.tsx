import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoModal.scss';
import { DeleteTodo } from '../DeleteTodo/DeleteTodo';
import { updateTodoTitle } from '../../api/todos';

interface Props {
  todo: Todo;
  isBeingEdited: boolean;
  deleteTodo: (todoId: number) => void;
  handleUpdateTodoStatus: (todo: Todo) => void;
  handleEditTitleError: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  deleteTodo,
  isBeingEdited,
  handleUpdateTodoStatus,
  handleEditTitleError,
}) => {
  const { completed } = todo;
  const { title } = todo;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setIsLoading(isBeingEdited);
  }, [isBeingEdited]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setNewTitle(title);
  }, [title]);

  const updateTitle = useCallback(async () => {
    if (newTitle === title) {
      cancelEditing();
    }

    if (newTitle.trim() === '') {
      deleteTodo(todo.id);

      return;
    }

    try {
      setIsLoading(true);

      await updateTodoTitle(todo.id, newTitle);
      setIsEditing(false);
    } catch {
      setIsEditing(true);
      handleEditTitleError();
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  }, [
    newTitle,
    title,
    cancelEditing,
    deleteTodo,
    handleEditTitleError,
    todo.id,
    updateTodoTitle,
  ]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTitle();
  }, [updateTitle]);

  const handleBlur = useCallback(async () => {
    setIsEditing(false);

    if (newTitle !== title) {
      await updateTitle();
    }
  }, [newTitle, title, updateTitle]);

  const handleEscape = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        cancelEditing();
      }
    }, [cancelEditing],
  );

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => {
            handleUpdateTodoStatus(todo);
          }}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo__title input-normalize"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            onBlur={handleBlur}
            onKeyUp={handleEscape}
          />
        </form>
      ) : (
        <span className="todo__title" onDoubleClick={handleDoubleClick}>
          {newTitle}
        </span>
      )}

      <DeleteTodo todoId={todo.id} onclick={deleteTodo} />

      <div className={classNames('modal overlay', { 'is-active': isLoading })}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
