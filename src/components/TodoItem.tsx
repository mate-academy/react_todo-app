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

  const handleCancelEditing = (
    event: KeyboardEvent<HTMLInputElement>,
    title: string,
  ) => {
    if (event.key === 'Escape') {
      setIsEditMode(false);
      setInputValue(title);
    }
  };

  const handleFormSubmit = (value: boolean, title: string) => {
    if (inputValue.trim()) {
      onChange(inputValue, todo.id);
      setIsEditMode(value);
    } else {
      setIsEditMode(false);
      setInputValue(title);
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
          completed: todo.completed,
          editing: isEditMode,
        },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
        <label
          onDoubleClick={() => setIsEditMode(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onClose(todo.id)}
        >
          .
        </button>
      </div>
      {isEditMode && (
        <form
          onSubmit={() => handleFormSubmit(false, todo.title)}
          onBlur={() => handleFormSubmit(false, todo.title)}
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
