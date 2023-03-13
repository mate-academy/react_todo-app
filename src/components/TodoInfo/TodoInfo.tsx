import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo,
  onDelete: (id: number) => void,
  deletedTodosId: number[],
  activeTodoId: number[],
  hendeleCheckboxChange: (id: number, completed: boolean) => void,
  editTodo: (id: number, newTitle: string) => void,
  updatedTodoID: number[],
};

export const TodoInfo: React.FC<Props> = React.memo(({
  todoList,
  onDelete,
  deletedTodosId,
  activeTodoId,
  hendeleCheckboxChange,
  editTodo,
  updatedTodoID,
}) => {
  const { title, completed, id } = todoList;
  const isSpinerActive = deletedTodosId.includes(id)
    || activeTodoId.includes(id) || updatedTodoID.includes(id);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isEditing]);

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTitle.trim()) {
      await editTodo(id, newTitle);
    }

    if (newTitle.length === 0) {
      onDelete(id);
    }

    setIsEditing(false);
  };

  const onBlurSubmitEdit = (event: React.FocusEvent) => {
    event.preventDefault();

    if (newTitle.trim()) {
      editTodo(id, newTitle);
    }

    setIsEditing(false);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked
          onChange={() => hendeleCheckboxChange(id, completed)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmitEdit}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={newTodoField}
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={onBlurSubmitEdit}
            onKeyDown={keyDownHandler}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={() => onDelete(id)}
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
          { 'is-active': isSpinerActive },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
