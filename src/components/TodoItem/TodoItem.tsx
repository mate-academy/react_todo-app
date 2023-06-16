import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleTodoRemove: (id: number) => void,
  loadingTodoIds: number[];
  handleUpdateTodo: (id: number, data: boolean | string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleTodoRemove,
  loadingTodoIds,
  handleUpdateTodo,
}) => {
  const { id, title, completed } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [isClicked, setIsClicked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isClicked]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTitle.trim()) {
      handleUpdateTodo(id, newTitle);
    } else if (!newTitle.trim()) {
      handleTodoRemove(id);
    }

    setIsClicked(false);
  };

  const handleCancel = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsClicked(false);
    }
  };

  const handleOnBlur = () => {
    handleUpdateTodo(id, newTitle);
    setIsClicked(false);
  };

  return (
    <div
      className={classNames('todo',
        { completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          onChange={() => handleUpdateTodo(id, !completed)}
        />
      </label>

      {isClicked ? (
        <form
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleInput}
            onKeyDown={handleCancel}
            onBlur={handleOnBlur}
            ref={inputRef}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsClicked(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => handleTodoRemove(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        className={classNames(
          'modal overlay',
          { 'is-active': loadingTodoIds.includes(id) },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
