import classNames from 'classnames';
import { useState, useContext } from 'react';
import { PatchedTodo, Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';
import { updateTodoTitle } from '../../api/todos';
import { LoadingContext } from '../LoadingContext/LoadingContext';

  type Props = {
    todo: Todo
    onChangeIsError: (e: Errors) => void
    onDeleteTodo: (todoId: number) => void
    onChangeTodo:
    (id: number, data: PatchedTodo) => void;
  };

export const TodoItem: React.FC<Props> = ({
  todo,
  onChangeIsError,
  onDeleteTodo,
  onChangeTodo,
}) => {
  const { title } = todo;
  const { id } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(id === 0);
  const { isLoadingAll } = useContext(LoadingContext);

  const handleDeleteTodo = async () => {
    try {
      setIsLoading(true);
      await onDeleteTodo(todo.id);
    } catch {
      onChangeIsError(Errors.DELETE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeTitle = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewTitle(title);
  };

  const updateTitle = async () => {
    if (newTitle === title) {
      await cancelEditing();

      return;
    }

    if (!newTitle.trim()) {
      await onDeleteTodo(todo.id);

      return;
    }

    try {
      setIsLoading(true);
      await updateTodoTitle(todo.id, newTitle);
      setIsEditing(false);
    } catch {
      setIsEditing(true);
      onChangeIsError(Errors.UPDATE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTitle();
  };

  const handleBlur = async () => {
    setIsEditing(false);

    if (newTitle !== title) {
      updateTitle();
    }
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      await onChangeTodo(todo.id, { completed: !todo.completed });
    } catch {
      onChangeIsError(Errors.UPDATE);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="todoapp__main">
        <div
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              // eslint-disable-next-line max-len
              onChange={handleToggle}
            />
          </label>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="todo__title todo__input"
                value={newTitle}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
                onBlur={handleBlur}
                onKeyUp={handleEscape}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </form>
          ) : (
            <span className="todo__title" onDoubleClick={handleChangeTitle}>
              {newTitle}
            </span>
          )}

          <button
            type="button"
            className="todo__remove"
            onClick={handleDeleteTodo}
          >
            ×
          </button>

          <div className={classNames('modal overlay', {
            'is-active': isLoading || isLoadingAll,
          })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      </section>
    </>
  );
};
