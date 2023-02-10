import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  todoIdsOnLoad: number[],
  onTodoDelete: (id: number) => void,
  onTodoComplete: (todo: Todo) => void,
  saveInputChange: (id: number, title: string) => void

};

export const TodoInfo: React.FC<Props> = ({
  todo,
  todoIdsOnLoad,
  onTodoDelete,
  onTodoComplete,
  saveInputChange,
}) => {
  const { completed, title, id } = todo;
  const [inputMode, setInputMode] = useState(false);
  const [titleRecord, setTitleRecord] = useState(title);

  const handleInputModification = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitleRecord(event.currentTarget.value);
  };

  const updateInputInfo = () => {
    if (titleRecord === title) {
      setInputMode(false);

      return;
    }

    saveInputChange(id, titleRecord);
    setInputMode(false);
  };

  const handleButtonPressing = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setInputMode(false);

      return;
    }

    if (event.key === 'Enter') {
      updateInputInfo();
    }
  };

  const handleButtonBlur = () => {
    updateInputInfo();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => onTodoComplete(todo)}
        />
      </label>

      {!inputMode ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setInputMode(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={() => onTodoDelete(id)}
          >
            ×
          </button>
        </>
      ) : (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          className="todo__title-field"
          value={titleRecord}
          onChange={handleInputModification}
          onBlur={handleButtonBlur}
          onKeyDown={handleButtonPressing}
        />
      )}

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal overlay',
          {
            'is-active': todoIdsOnLoad.includes(id) || todo.id === 0,
          },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
