/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { KeyboardEvent, useState } from 'react';
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

  const handleFormDisplay = (value: boolean) => {
    setIsEditMode(value);
  };

  const handleCancelEditing = (
    event: KeyboardEvent<HTMLFormElement>,
    title: string,
  ) => {
    if (event.key === 'Escape') {
      handleFormDisplay(false);
      setInputValue(title);
    }
  };

  const handleFormSubmit = (value: boolean, title: string) => {
    if (inputValue) {
      onChange(inputValue, todo.id);
      handleFormDisplay(value);
    } else {
      handleFormDisplay(false);
      setInputValue(title);
    }
  };

  return (
    <li
      className={classNames(
        {
          completed: todo.completed,
          editing: isEditMode,
        },
      )}
    >
      {isEditMode ? (
        <form
          onSubmit={() => handleFormSubmit(false, todo.title)}
          onBlur={() => handleFormSubmit(false, todo.title)}
          onKeyUp={(e) => handleCancelEditing(e, todo.title)}
        >
          <input
            type="text"
            className="edit"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, !todo.completed)}
          />
          <label
            htmlFor="toggle-view"
            onDoubleClick={() => handleFormDisplay(true)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => onClose(todo.id)}
          />
        </div>
      )}
    </li>
  );
};
