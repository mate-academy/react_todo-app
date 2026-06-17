import '../../styles/todo.scss';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { useCallback, useContext, useState } from 'react';
import { DispatchContext } from '../../Store';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(todo.title);

  const saveTodo = useCallback(async () => {
    const trimmedTitle = updatedTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    setIsLoading(true);

    if (!trimmedTitle) {
      dispatch({ type: 'delete', id: todo.id });
    } else {
      dispatch({
        type: 'update',
        todoToUpdate: { id: todo.id, title: trimmedTitle },
      });
    }

    setIsEditing(false);
    setIsLoading(false);
  }, [updatedTitle, todo, dispatch]);

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      saveTodo();
    },
    [saveTodo],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setUpdatedTitle(todo.title);
        setIsEditing(false);
      }
    },
    [setIsEditing, setUpdatedTitle, todo.title],
  );

  const handleCheckbox = useCallback(() => {
    setIsLoading(true);

    dispatch({
      type: 'update',
      todoToUpdate: { id: todo.id, completed: !todo.completed },
    });

    setIsLoading(false);
  }, [dispatch, todo.id, todo.completed]);

  const handleDelete = useCallback(() => {
    setIsLoading(true);

    dispatch({ type: 'delete', id: todo.id });

    setIsLoading(false);
  }, [dispatch, todo.id]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleCheckbox}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={updatedTitle}
            onChange={inputHandler}
            onBlur={saveTodo}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>{' '}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': isLoading || todo.id === 0,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
