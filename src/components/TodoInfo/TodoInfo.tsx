import classNames from 'classnames';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  deleteTodoHandler: (todoId: number) => void,
  deletedTodosIds: number[],
  onToggleTodo: (todoIt: number, completed: boolean) => void,
  handleChangeTodoTittle: (todoId: number, title: string) => void;
  selectedTodoId: number[],
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  deleteTodoHandler,
  deletedTodosIds,
  onToggleTodo,
  handleChangeTodoTittle,
  selectedTodoId,
}) => {
  const { id, title, completed } = todo;
  const [newTodoTitle, setNewTodoTitle] = useState(title);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    if (event.detail === 2) {
      setIsRenaming(true);
    }
  }, []);

  const handleCloseRenaming = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTodoTitle(title);
      setIsRenaming(false);
    }
  }, []);

  const submitNewTodoTitle = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle === title) {
      setNewTodoTitle(title);
      setIsRenaming(false);
    } else if (newTodoTitle.length === 0) {
      deleteTodoHandler(id);
    } else {
      handleChangeTodoTittle(id, newTodoTitle);
      setIsRenaming(false);
    }
  }, [newTodoTitle]);

  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [isRenaming]);

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => onToggleTodo(id, completed)}
        />
      </label>

      {isRenaming ? (
        <form
          onSubmit={submitNewTodoTitle}
          onBlur={submitNewTodoTitle}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={titleInput}
            defaultValue={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
            onKeyDown={handleCloseRenaming}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            role="button"
            tabIndex={0}
            className="todo__title"
            onClick={event => handleDoubleClick(event)}
            aria-hidden="true"
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={() => deleteTodoHandler(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': deletedTodosIds.includes(id)
            || selectedTodoId.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
