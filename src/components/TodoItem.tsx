import { KeyboardEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onClose(todoId: number): void;
  onToggle(todoId: number, completed: boolean): void;
  onChange(value: string, todoId: number): void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onClose,
  onToggle,
  onChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);
  const { title, id, completed } = todo;

  const handleCancelEditing = (
    event: KeyboardEvent<HTMLInputElement>,
    query: string,
  ) => {
    if (event.key === 'Escape') {
      setIsEditMode(false);
      setInputValue(query);
    }
  };

  const handleFormSubmit = (value: boolean, query: string) => {
    if (inputValue.trim()) {
      onChange(inputValue, id);
      setIsEditMode(value);
    } else {
      setIsEditMode(false);
      setInputValue(query);
    }
  };

  const editInput = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <li
      className={classNames(
        {
          completed,
          editing: isEditMode,
        },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => onToggle(id, !completed)}
        />
        <label
          onDoubleClick={() => setIsEditMode(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onClose(id)}
        >
          .
        </button>
      </div>
      {isEditMode && (
        <form
          onSubmit={() => handleFormSubmit(false, title)}
          onBlur={() => handleFormSubmit(false, title)}
        >
          <input
            type="text"
            className="edit"
            ref={editInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => handleCancelEditing(e, todo.title)}
          />
        </form>
      )}
    </li>
  );
};
