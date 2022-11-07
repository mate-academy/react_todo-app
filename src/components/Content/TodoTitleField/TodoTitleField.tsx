import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo;
  isAdding: boolean;
  onUpdate: (todoId: number, data: {}) => void;
  onDelete: (todoId: number) => void;
};

export const TodoTitleField: React.FC<Props> = ({
  todo,
  isAdding,
  onUpdate,
  onDelete,
}) => {
  const { id, title } = todo;

  const [updatedTodoTitle, setUpdatedTodoTitle] = useState(title);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const todoTitleField = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value !== updatedTodoTitle) {
      setUpdatedTodoTitle(value);
    }
  };

  const handleOnBlur = () => {
    if (!updatedTodoTitle.length) {
      onDelete(id);
    }

    if (title !== updatedTodoTitle && updatedTodoTitle.length > 0) {
      onUpdate(id, { title: updatedTodoTitle });
    }

    setIsDoubleClicked(false);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsDoubleClicked(false);
      setUpdatedTodoTitle(title);
    }

    if (event.key === 'Enter') {
      handleOnBlur();
    }
  };

  useEffect(() => {
    if (todoTitleField.current) {
      todoTitleField.current.focus();
    }
  }, [isDoubleClicked]);

  return (
    <>
      {!isDoubleClicked && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsDoubleClicked(true)}
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

      {isDoubleClicked && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={todoTitleField}
            value={updatedTodoTitle}
            disabled={isAdding}
            onChange={(event) => handleOnChange(event)}
            onBlur={() => handleOnBlur()}
            onKeyDown={(event) => handleOnKeyDown(event)}
          />
        </form>
      )}
    </>
  );
};
